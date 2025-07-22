'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { Home, Slash, Book, CircleHelp } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

import { useSession, discordSignIn } from '~/lib/auth';
import { useTranslations } from 'next-intl';

const navItems = [
	{ key: 'nav.home', href: '/', icon: <Home className='mr-1.5' /> },
	{ key: 'nav.commands', href: '/commands', icon: <Slash className='mr-1.5' /> },
	{ key: 'nav.faq', href: '/faq', icon: <CircleHelp className='mr-1.5' /> },
	{ key: 'nav.documentation', href: 'https://evelyndocs.vercel.app', icon: <Book className='mr-1.5' /> },
];

export function NavigationBar() {
	const t = useTranslations('home');
	const session = useSession();

	return (
		<div className='w-full px-6 text-white backdrop-blur-md h-[60px] flex flex-row items-center'>
			<h1 className='leading-4 text-xl font-bold'>OpenEve</h1>
			<NavigationMenu>
				<NavigationMenuList className='ml-5 sm:flex hidden'>
					{navItems.map((item) => (
						<NavigationMenuItem key={item.key} className={navigationMenuTriggerStyle()}>
							<NavigationMenuLink href={item.href} className='gap-5'>
								{t(item.key)}
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
			<div className="ml-auto">
				{session.data
					? (
						<Link href='/pickaguild' className="sm:flex hidden">
							<Button className="bg-black/50 hover:bg-white hover:text-black hover:cursor-pointer text-white">
                                Manage Servers
							</Button>
						</Link>
					)
					: (
						<Button className="sm:flex hidden bg-black/50 hover:bg-white hover:text-black hover:cursor-pointer text-white" onClick={discordSignIn}>
                            Sign in via Discord
						</Button>
					)
				}
			</div>
		</div>
	);
}

// <MobileNavigation navItems={navItems} className="inline-flex sm:hidden" />