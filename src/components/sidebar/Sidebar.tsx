'use client';

import { Sheet, SheetContent, Spacer } from '@/components/ui';
import { BottomCard, SidebarContent } from './SidebarContent';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageStore } from '@/utils/pageStore';
import { showCorrectShit } from '@/utils/util';
import { InGuildSidebar } from '@/components/guild/GuildSidebar';

export function Sidebar() {
	const sidebar = showCorrectShit({ thing: <InGuildSidebar />, type: 'sidebar' });

	return (
		<div
			className={'flex-col xl:flex hidden flex-shrink-0 black2 w-[300px] h-screen overflow-x-hidden overflow-y-auto'}>
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
			<Spacer />
			<BottomCard />
		</div>
	);
}

export function SidebarResponsive() {
	const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);
	const sidebar = showCorrectShit({ thing: <InGuildSidebar />, type: 'sidebar' });

	return (
		<Sheet open={isOpen} onOpenChange={(state) => setOpen(state)}>
			<SheetContent className='fixed mr-0 mb-0 ml-0 w-[100%] black2 h-screen flex flex-col'>
				{sidebar ?? <SidebarContent />}
				<Spacer />
				<BottomCard />
			</SheetContent>
		</Sheet>
	);
}
