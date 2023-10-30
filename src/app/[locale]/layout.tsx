import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '@/styles/global.css';

const locales = ['en'];
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode, params: { locale: string } }) {
	let messages;
	try {
		messages = (await import(`../../locales/${locale}.json`)).default;
	}
	catch (error) {
		console.log('Did not find a locale. Returning notFound.');
		notFound();
	}

	unstable_setRequestLocale(locale);

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