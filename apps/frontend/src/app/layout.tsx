import { NextAuthProvider, QueryProvider } from '@/components/providers';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
	title: 'Evelyn | shadowworks.',
	description: 'PLACEHOLDER',
};

export default function RootLayout({
	children,
}: {
    children: ReactNode,
  }) {
	return (
		<html lang='en'>
			<body>
				<NextAuthProvider>
					<QueryProvider>
						{children}
					</QueryProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}