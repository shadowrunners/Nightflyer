import { Guilds } from "../schemas/guild.schema";

abstract class GuildService {
    static async get(guild: string) {
        return await Guilds.findOne({ guildId: guild }).select('-_id');
    }
}