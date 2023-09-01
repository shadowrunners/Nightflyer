import { deepmerge } from 'deepmerge-ts';
import { Options } from './core';
import { Session } from 'next-auth';

export function botRequest<T extends Options>(session: Session, options: T): T {
	return {
		...options,
		origin: process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080/api',
		request: deepmerge(
			{
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
				},
				credentials: 'include',
				mode: 'cors',
			},
			options.request,
		),
	};
}

export function discordRequest<T extends Options>(accessToken: string, options: T): T {
	return {
		...options,
		origin: 'https://discord.com/api/v10',
		request: deepmerge(
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
			options.request,
		),
	};
}
