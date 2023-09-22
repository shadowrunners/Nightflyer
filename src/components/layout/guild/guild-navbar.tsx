'use client';

import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui';
import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { useGuildPreview } from '@/api/hooks';
import { useRouter } from 'next/router';
import { iconUrl } from '@/api/discord';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

export default function GuildNavbar({ back }: { back?: boolean }) {
	const { guild: selected } = useRouter().query as { guild: string };
	const { guild } = useGuildPreview(selected);

	return (
		<div className='flex w-full flex-row items-center text-white'>
			<HorizontalCollapse in={back ?? false}>
				<a className='flex xl:hidden pr-3 py-3' href={`/dash/guilds/${selected}`}>
					<ChevronLeftIcon className='my-auto font-semibold' />
				</a>
			</HorizontalCollapse>
			{guild == null ? (
				<Skeleton className='mr-3 rounded-full' />
			) : (
				<Avatar className='none xl:block mr-3'>
					<AvatarImage src={iconUrl(guild)} />
					<AvatarFallback>SW</AvatarFallback>
				</Avatar>
			)}
			<h1 className='font-poppins font-semibold text-ellipsis whitespace-nowrap w-0 flex-1 overflow-hidden'>
				{guild?.name}
			</h1>
		</div>
	);
}

function HorizontalCollapse({ in: isOpen, children }: { in: boolean; children: ReactElement }) {
	return (
		<motion.section
			animate={isOpen ? 'open' : 'collapsed'}
			exit="collapsed"
			initial="collapsed"
			variants={{
				open: { opacity: 1, width: 'auto' },
				collapsed: { opacity: 0, width: 0 },
			}}
			transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
		>
			{children}
		</motion.section>
	);
}
