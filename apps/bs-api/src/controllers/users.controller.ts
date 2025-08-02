import { getBotGuilds } from '../services/bot.service';
import { getCurrentUserGuilds } from '../services/users.service';
import { getAccessToken } from '../utils/getAccessToken';
import { Elysia, status } from 'elysia';

export const usersController = new Elysia({ prefix: '/users' })
    .get('/', () => 'hi')
    .get('/@me/guilds', async ({ headers }) => {
        const token = await getAccessToken(headers);
        if (!token) return status('Internal Server Error', 'Failed to fetch user access token.');

        const [botGuilds, userGuilds] = await Promise.all([
            await getBotGuilds(),
            await getCurrentUserGuilds(token as string),
        ]);

        const botGuildsSet = new Set(botGuilds.map((guild) => guild.id));
        return userGuilds.map((guild) => ({
            name: guild.name,
            id: guild.id,
            botPresent: botGuildsSet.has(guild.id),
            icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=96`,
            owner: guild.owner,
            permissions: guild.permissions,
        }));
    }, {
        auth: true,
    });