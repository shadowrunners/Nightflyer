export async function fetchGuild(id: string) {
	const data = await fetch(`https://discord.com/api/v10/guilds/${id}`, {
		headers: {
			Authorization: `Bot ${process.env.CLIENT_TOKEN as string}`,
		},
	});

	return await data.json();
}