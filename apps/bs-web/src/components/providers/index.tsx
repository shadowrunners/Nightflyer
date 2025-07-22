'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

const client = new QueryClient({
	defaultOptions: {
		mutations: {
			retry: 0,
		},
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			retry: 0,
		},
	},
});

export function Providers({
	children,
}: {
    children: ReactNode,
}) {
	return (
		<QueryClientProvider client={client}>
			{children}
		</QueryClientProvider>
	);
}