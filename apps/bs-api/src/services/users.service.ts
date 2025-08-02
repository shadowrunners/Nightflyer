import ky from "ky";
import { PermissionFlagsBits, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';

export async function getCurrentUserGuilds(accessToken: string) {
    const res = await ky.get('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).json<RESTGetAPICurrentUserGuildsResult>();

    return res.filter((guild) => (BigInt(guild.permissions) & BigInt(PermissionFlagsBits.Administrator)) !== BigInt(0));
};

export async function getCurrentUser(accessToken: string) {
    return await ky.get('https://discord.com/api/v10/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).json();
}

