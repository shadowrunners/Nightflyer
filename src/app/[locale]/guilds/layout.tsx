import AppLayout from '../home/layout';
import type { ReactNode } from 'react';

export default function GuildLayout({ children }: { children: ReactNode }) {
	return (
		<AppLayout>{children}</AppLayout>
	);
}
