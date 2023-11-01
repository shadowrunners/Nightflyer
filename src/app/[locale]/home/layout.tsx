'use client';

import { Sidebar, SidebarResponsive } from '@/components/sidebar';
import { LoadingPanel, QueryStatus } from '@/components/panels';
import { useSelfUserQuery } from '@/utils/API/hooks';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
	const query = useSelfUserQuery();

	return (
		<div className='flex flex-row h-full black2'>
			<Sidebar />
			<div className='hidden lg:block'>
				<SidebarResponsive />
			</div>

			<QueryStatus query={query} loading={<LoadingPanel />} error="Couldn't fetch the necessary data about the user.">
				<div className='flex relative flex-col h-[100%] overflow-auto w-full max-w-[100%] max-h-[100%] xl:w-[calc(100%-290px)] card-background'>
					<div className='top-0 mx-auto max-w-[1200px] w-full sm:pt-[16px] sm:px-[30px] px-9 pt-[16px]'>
						<Navbar />
					</div>
					<div className='mx-auto w-full max-w-[1200px] flex-1 my-0 px-[24px] sm:px-[30px]'>
						{children}
					</div>
				</div>
			</QueryStatus>
		</div>
	);
}
