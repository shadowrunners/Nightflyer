// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';
import { ThemeProvider } from '@/components/ThemeProvider';
import { theme } from '@/theme/config';
import { ReactNode } from 'react';

export default function Document({ children }: { children: ReactNode }) {
	return (
		<Html lang="en">
			<Head />
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<Main />
				</ThemeProvider>
				<NextScript />
			</body>
		</Html>
	);
}
