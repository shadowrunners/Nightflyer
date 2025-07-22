import { Server, LogOut, MailQuestion, ChevronUp, ArrowLeft } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from './sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { useGuildId } from '~/hooks';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { signOut, useSession } from 'next-auth/react';
import { Link } from '~/i18n/routing';
import type { Session } from 'next-auth';
import { getFeatures } from '~/utils';
import { useTranslations } from 'next-intl';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const id = useGuildId();
	const { data } = useSession();
	const t = useTranslations('dash');
	const items = getFeatures('sidebar', id);

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader className="text-white">
				<SidebarMenu>
					<SidebarMenuItem>
						<h1 className="font-mono font-semibold p-2 text-center">{t('sidebar.title')}</h1>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' className="hover:text-white" asChild>
							<Link href="/pickaguild">
								<ArrowLeft />
								<h1 className="font-sans font-semibold">{t('sidebar.labels.back_button')}</h1>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="text-white font-sans">
				<SidebarGroup>
					<SidebarGroupLabel className="text-dimWhite">{t('sidebar.labels.features')}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.baseName}>
									<SidebarMenuButton className="hover:text-white" asChild>
										<Link href={item.href}>
											<item.icon />
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SideUser data={data as Session} t={t} />
			</SidebarFooter>
		</Sidebar>
	);
}

function SideUser({ data, t }: { data: Session, t: (key: string) => string }) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className='h-8 w-8 rounded-xl'>
								<AvatarFallback>SP</AvatarFallback>
								<AvatarImage src={data?.user.avatarURL as string} />
							</Avatar>
							<p className="text-white font-sans text-left font-semibold">{data?.user.name}</p>
							<ChevronUp className="ml-auto size-4 text-white" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-black text-white"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<Link href='/pickaguild' className='inline-flex flex-row items-center w-full'>
							<DropdownMenuItem className="cursor-pointer">
								<Server className="mr-1 w-[16px] h-[16px]" />
								{t('sidebar.user.items.servers')}
							</DropdownMenuItem>
						</Link>
						{process.env.NEXT_PUBLIC_OWNER_ID === data?.user.id ? (
							<Link href='/internal-dev' className='inline-flex flex-row items-center w-full'>
								<DropdownMenuItem className="cursor-pointer">
									<MailQuestion className="mr-1 w-[16px] h-[16px]" />
									{t('sidebar.user.items.developer_panel')}
								</DropdownMenuItem>
							</Link>
						) : <></>}
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => signOut()}
						>
							<LogOut className="mr-1 w-[16px] h-[16px]" />
                    		{t('sidebar.user.items.sign_out')}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}