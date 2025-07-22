import { Providers } from '@components/providers/index';
import { NextIntlClientProvider } from 'next-intl';
import { CookieConsent } from '@components/ui';
import type { ReactNode } from 'react';
import { Metadata } from 'next';

import '../styles/globals.css';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Evelyn',
	description: 'PLACEHOLDER',
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const cookieStore = await cookies();
	const locale = cookieStore.get('bs-locale')?.value;

	console.log(locale);

	return (
		<html lang={locale} suppressHydrationWarning={true}>
			<body>
				<Providers>
					<NextIntlClientProvider locale={locale}>
						{children}
						<CookieConsent />
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}