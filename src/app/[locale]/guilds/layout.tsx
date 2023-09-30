'use client';

import { InGuildSidebar } from '@/components/layout/guild/guild-sidebar';
import GuildNavbar from '@/components/layout/guild/guild-navbar';
import { usePathname } from 'next/navigation';
import AppLayout from '../home/layout';
import type { ReactNode } from 'react';

export default function GuildLayout({ children }: { children: ReactNode }) {
	const back = usePathname().split('/')[4] ? true : false;
	return (
		<AppLayout navbar={<GuildNavbar />} sidebar={back ? <InGuildSidebar /> : undefined}>
			{children}
		</AppLayout>
	);
}
