import { logout } from '@/utils/auth/hooks';
import { callReturn } from '@/utils/fetch/core';
import { discordRequest } from '@/utils/fetch/requests';
import type { Guild, UserInfo } from '@/utils/types';

export async function fetchUserInfo(accessToken: string) {
	return await callReturn<UserInfo>(
		'/users/@me',
		discordRequest(accessToken, {
			request: {
				method: 'GET',
			},
			allowed: {
				401: async () => {
					await logout();

					throw new Error('Not logged in');
				},
			},
		}),
	);
}

export async function getGuilds(accessToken: string) {
	return await callReturn<Guild[]>(
		'/users/@me/guilds',
		discordRequest(accessToken, { request: { method: 'GET' } }),
	);
}

export async function getGuild(accessToken: string, id: string) {
	return await callReturn<Guild>(
		`/guilds/${id}`,
		discordRequest(accessToken, { request: { method: 'GET' } }),
	);
}

export function iconUrl(guild: Guild) {
	return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
}

export function avatarUrl(user: UserInfo) {
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`;
}

export function bannerUrl(id: string, banner: string): string {
	return `https://cdn.discordapp.com/banners/${id}/${banner}?size=1024`;
}
