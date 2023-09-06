import { BottomCard, SidebarContent } from './SidebarContent';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageStore } from '@/utils/pageStore';
import { ReactNode } from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

export function Sidebar({ sidebar }: { sidebar?: ReactNode }) {
	return (
		<div
			className={`flex-col xl:flex hidden flex-shrink-0 black2 w-[300px] h-screen overflow-x-hidden overflow-y-auto`}>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={sidebar === null ? 'default' : 'new'}
					initial={{ x: '100px', opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: '-100px', opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
				>
					{sidebar ?? <SidebarContent />}
				</motion.div>
			</AnimatePresence>

			<div className='flex-1 self-stretch' />

			<BottomCard />
		</div>
	);
}

export function SidebarResponsive({ sidebar }: { sidebar?: ReactNode }) {
	const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);

	return (
		<Sheet open={isOpen} onOpenChange={(state) => setOpen(state)}>
			<SheetContent>
				{sidebar ?? <SidebarContent />}
				<div className='flex-1 self-stretch mt-[50px]' />
				<BottomCard />
			</SheetContent>
		</Sheet>
	);
}
