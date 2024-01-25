'use client';

import { Button, ScrollArea, Sheet, SheetTrigger, SheetContent } from './';
import { useGuildPreview } from '@/utils/API/hooks';
import { RxHamburgerMenu } from 'react-icons/rx';
import { cn, getFeatures } from '@/utils/util';
import { FaChevronLeft } from 'react-icons/fa';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	guildId: string;
}

export function Sidebar({ className, guildId }: SidebarProps) {
	const { guild } = useGuildPreview(guildId);

	return (
		<div className={cn('pb-12 xl:flex hidden text-white w-[300px] overflow-x-hidden overflow-y-auto m-3 rounded-xl bg-secondary', className)}>
			<div className="space-y-4 py-4">
				<div className="px-3">
					<a className='flex items-center cursor-pointer mb-2' href={`/guilds/${guild?.id}`}>
						<Button className='hidden xl:block bg-primary rounded-2xl'>
							<FaChevronLeft className='align-middle text-white' />
						</Button>
						<h2 className="px-2 text-lg font-semibold tracking-tight">
							{guild?.name}
						</h2>
					</a>
				</div>
				<div className="py-2">
					<h2 className="relative px-7 text-lg font-semibold tracking-tight">
						Features
					</h2>
					<ScrollArea className="h-auto px-1">
						<div className="space-y-2 p-2">
							{getFeatures().map((feature) => (
								<a className='' href={`/guilds/${guildId}/features/${feature.name.toLowerCase().replace('-', '')}`}>
									<Button
										key={`${feature.id}-${feature.name}`}
										variant="ghost"
										className='w-full justify-start font-normal mt-1'
									>
										<div className='mr-1'>{feature.icon}</div>
										{feature.name}
									</Button>
								</a>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}

export function MobileSidebar({ className, guildId }: { className?: string, guildId: string }) {
	const { guild } = useGuildPreview(guildId);

	return (
		<Sheet>
			<SheetTrigger>
				<RxHamburgerMenu className='xl:hidden ml-3 text-white cursor-pointer' />
			</SheetTrigger>
			<SheetContent side='left' className='fixed mr-0 mb-0 ml-0 w-[100%] bg-secondary h-screen flex flex-col'>
				<div className={cn('pb-12 text-white w-[300px] overflow-x-hidden overflow-y-auto', className)}>
					<div className="space-y-4 py-4">
						<a className='flex items-center cursor-pointer mb-2' href={`/guilds/${guild?.id}`}>
							<Button className='bg-primary rounded-2xl'>
								<FaChevronLeft className='align-middle text-white' />
							</Button>
							<h2 className="px-2 text-lg font-semibold tracking-tight">
								{guild?.name}
							</h2>
						</a>
						<div className="py-2">
							<h2 className="relative px-7 text-lg font-semibold tracking-tight">
								Features
							</h2>
							<ScrollArea className="h-auto px-1">
								<div className="space-y-2 p-2">
									{getFeatures().map((feature) => (
										<a className='' href={`/guilds/${guildId}/features/${feature.name.toLowerCase().replace('-', '')}`}>
											<Button
												key={`${feature.id}-${feature.name}`}
												variant="ghost"
												className='w-full justify-start font-normal mt-1'
											>
												<div className='mr-1'>{feature.icon}</div>
												{feature.name}
											</Button>
										</a>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}