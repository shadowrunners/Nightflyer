import { PermissionFlags } from '@/types/types';
import { AppConfig } from './types';

export const config: AppConfig = {
	name: 'Evelyn',
	inviteUrl:
		'https://discord.com/oauth2/authorize?client_id=1104526040656785418&scope=bot',
	guild: {
		// filter guilds that user has no permissions to manage it
		filter: (guild) => (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
	},
};
