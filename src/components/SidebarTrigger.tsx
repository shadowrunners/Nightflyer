import { IoMenuOutline } from 'react-icons/io5';
import { usePageStore } from '@/utils/pageStore';

export function SidebarTrigger() {
	const setOpen = usePageStore((s) => s.setSidebarIsOpen);

	return (
		<div className='flex xl:hidden justify-center text-white'>
			<div className='w-full h-full' onClick={() => setOpen(true)}>
				<IoMenuOutline className='my-auto w-[20px] h-[20px] me-[10px] cursor-pointer' />
			</div>
		</div>
	);
}
