import { GuildChannel } from '@/types/types';

export async function fetchGuild(id: string) {
	const data = await fetch(`https://discord.com/api/v10/guilds/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bot ${process.env.CLIENT_TOKEN as string}`,
		},
	});

	return await data.json();
}

export async function fetchChannels(id: string): Promise<GuildChannel[]> {
	const data = await fetch(`https://discord.com/api/v10/guilds/${id}/channels`, {
		method: 'GET',
		headers: {
			Authorization: `Bot ${process.env.CLIENT_TOKEN as string}`,
		},
	});

	return await data.json();
}