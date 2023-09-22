import '@/styles/global.css';
import NextAuthProvider from '@/components/layout/NextAuthProvider';
import QueryProvider from '@/components/layout/QueryProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Evelyn | Nightflyerz',
	description: 'I\'m making a note here. HUGE SUCCESS.',
};


export default function RootLayout({
	children,
}: {
    children: React.ReactNode,
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