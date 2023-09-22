import '@/styles/global.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';

export function generateStaticParams() {
	return [{ locale: 'en' }];
}

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
	let messages;
	try {
		messages = (await import(`../../locales/${locale}.json`)).default;
	}
	catch (error) {
		console.log('Did not find a locale. Returning notFound.');
		notFound();
	}

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}