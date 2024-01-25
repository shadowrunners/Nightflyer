import { Guild } from '../interfaces/guild.interface';
import { Schema } from 'mongoose';

export const GuildSchema = new Schema<Guild>({
	guildId: String,
	logs: {
		enabled: Boolean,
		channel: String,
		webhook: {
			id: String,
			token: String,
		},
	},
	welcome: {
		enabled: Boolean,
		channel: String,
		embed: Object,
	},
	goodbye: {
		enabled: Boolean,
		channel: String,
		embed: Object,
	},
	blacklist: {
		isBlacklisted: Boolean,
		reason: String,
		time: Number,
	},
	tickets: {
		enabled: Boolean,
		embed: Object,
		transcriptChannel: String,
		assistantRole: String,
	},
	levels: {
		enabled: Boolean,
		channel: String,
		message: String,
		restrictedRoles: [String],
		restrictedChannels: [String],
	},
	confessions: {
		enabled: Boolean,
		channel: String,
		webhook: {
			id: String,
			token: String,
		},
	},
	antiphishing: {
		enabled: Boolean,
	},
	verification: {
		enabled: Boolean,
		role: String,
	},
});
