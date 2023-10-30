'use client';

import { QueryStatus } from '@/components/panels/QueryPanel';
import { useSelfUserQuery } from '@/utils/API/hooks';
import { LoadingPanel } from '@/components/panels/LoadingPanel';
import { Navbar } from '@/components/navbar';
import { Sidebar, SidebarResponsive } from '@/components/sidebar/Sidebar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	const query = useSelfUserQuery();

	return (
		<div className='flex flex-row h-full'>
			<Sidebar />
			<div className='hidden lg:block'>
				<SidebarResponsive />
			</div>

			<QueryStatus query={query} loading={<LoadingPanel />} error="Couldn't fetch the necessary data about the user.">
				<div className='flex relative flex-col h-[100%] overflow-auto w-full max-w-[100%] max-h-[100%] xl:w-[calc(100%-290px)] card-background'>
					<div className='top-0 mx-auto max-w-[1200px] w-full sm:pt-[16px] sm:px-[30px]'>
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
