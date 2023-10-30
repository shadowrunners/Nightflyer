import { DefaultNavbar } from './default';
import { SidebarTrigger } from '@/components/ui';
import { GuildNavbar } from '@/components/guild';
import { Fragment, ReactNode } from 'react';
import { showCorrectShit } from '@/utils/util';

export function Navbar({ links }: { links?: ReactNode; }) {
	const navbar = showCorrectShit({ thing: <GuildNavbar />, type: 'navbar' });

	return (
		<div className='flex flex-row mx-auto black2 backdrop-blur-[20px] rounded-[16px] px-[24px] py-3 lg:py-8 gap-2 justify-between items-stretch'>
			{navbar ?? <DefaultNavbar />}
			<NavbarLinksBox>{links}</NavbarLinksBox>
		</div>
	);
}

function NavbarLinksBox({ children }: { children?: ReactNode }) {
	return (
		<div className='flex justify-end items-center flex-row p-[10px]'>
			{children ?? (
				<Fragment>
					<SidebarTrigger />
				</Fragment>
			)}
		</div>
	);
}
