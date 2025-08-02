import type { RESTGetAPICurrentUserGuildsResult, RESTGetAPIGuildMemberResult, RESTGetAPIGuildResult } from "discord-api-types/v10";
import ky from "ky";

const api = ky.create({
    prefixUrl: 'https://discord.com/api/v10/',
    headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
});

export async function getBotGuilds() {
    return await api.get('users/@me/guilds').json<RESTGetAPICurrentUserGuildsResult>();
}

export async function getGuild(guildId: string) {
    return await ky.get(`guilds/${guildId}?with_counts=false`).json<RESTGetAPIGuildResult>();
}

export async function getGuildMember(guildId: string, userId: string) {
    return await ky.get(`guilds/${guildId}/members/${userId}`).json<RESTGetAPIGuildMemberResult>();
}