'use client';

import { QueryStatus } from '@/components/panel/QueryPanel';
import { useSelfUserQuery } from '@/api/hooks';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar, SidebarResponsive } from '../../../components/layout/sidebar';
import { ReactNode } from 'react';
import { DefaultNavbar } from '../../../components/layout/navbar/default';

export default function AppLayout({
	navbar,
	children,
	sidebar,
}: {
  navbar?: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
}) {
	const query = useSelfUserQuery();

	return (
		<div className='flex flex-row h-full'>
			<Sidebar sidebar={sidebar} />
			<div className='hidden lg:block'>
				<SidebarResponsive sidebar={sidebar} />
			</div>

			<QueryStatus query={query} loading={<LoadingPanel />} error="Couldn't fetch the necessary data about the user.">
				<div className='flex relative flex-col h-[100%] overflow-auto w-full max-w-[100%] max-h-[100%] xl:w-[calc(100%-290px)] card-background'>
					<div className='top-0 mx-auto max-w-[1200px] sticky w-full sm:pt-[16px] sm:px-[30px]'>
						<Navbar>{navbar ?? <DefaultNavbar />}</Navbar>
					</div>
					<div className='mx-auto w-full max-w-[1200px] flex-1 my-0 px-[24px] sm:px-[30px]'>
						{children}
					</div>
				</div>
			</QueryStatus>
		</div>
	);
}
