import { InGuildSidebar } from '@/components/layout/guild/guild-sidebar';
import GuildNavbar from '@/components/layout/guild/guild-navbar';
import AppLayout from '../home/layout';
import type { ReactNode } from 'react';

export default function GuildLayout({
	back,
	children,
}: {
  back?: boolean;
  children: ReactNode;
}) {
	return (
		<AppLayout navbar={<GuildNavbar back={back} />} sidebar={back ? <InGuildSidebar /> : undefined}>
			{children}
		</AppLayout>
	);
}
