import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getUserId, PermissionFlags } from '../utils/discord';
import { REST } from '@discordjs/rest';
import { API } from '@discordjs/core';
import { config } from 'dotenv';
import { GuildsService } from '../guilds/services/guild.service';

config();

@Injectable()
export class BotService {
	private readonly rest: REST;
	public readonly api: API;

	constructor(private readonly guilds: GuildsService) {
		this.rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);
		this.api = new API(this.rest);
	}

	public async getEnabledFeatures(guild: string) {
		const data = await this.guilds.getGuild(guild);

		const features = [
			{ name: 'antiphishing', enabled: () => data?.antiphishing?.enabled },
			{ name: 'confessions', enabled: () => data?.confessions?.enabled },
			{ name: 'goodbye', enabled: () => data?.goodbye?.enabled },
			{ name: 'logs', enabled: () => data?.logs?.enabled },
			{ name: 'levelling', enabled: () => data?.levels?.enabled },
			{ name: 'tickets', enabled: () => data?.tickets?.enabled },
			{ name: 'verification', enabled: () => data?.verification?.enabled },
			{ name: 'welcome', enabled: () => data?.welcome?.enabled },
		];

		const filterFeatures = features.filter((feature) => feature.enabled() === true);
		const enabledFeatures = filterFeatures.map((feature) => feature.name);
		return enabledFeatures.join(', ');
	}

	public getToken(auth: string | undefined | null): string | undefined {
		if (!auth) return undefined;
		return auth.slice(7).trim();
	}

	public async checkPermissions(token: string | undefined | null, guildID: string) {
		const guild = await this.api.guilds.get(guildID);

		if (guild === null)
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);

		const accessToken = this.getToken(token);
		const userId = await getUserId(accessToken) as string;
		const member = await this.api.guilds.getMember(guild.id, userId);

		if (
			(Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0 &&
			guild?.owner_id !== member?.user?.id
		) throw new HttpException('Missing permissions', HttpStatus.BAD_REQUEST);
	}
}