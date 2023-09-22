import { SidebarTrigger } from '@/components/SidebarTrigger';
import { Fragment, ReactNode } from 'react';

export function Navbar({ links, children }: { links?: ReactNode; children: ReactNode }) {
	return (
		<div className='flex flex-row mx-auto backdrop-blur-[20px] rounded-[16px] px-[24px] py-3 lg:py-8 gap-2 justify-between items-stretch'>
			{children}
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
