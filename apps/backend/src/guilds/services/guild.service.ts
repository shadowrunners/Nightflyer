import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

import { InjectModel } from '@nestjs/mongoose';
import { Guild } from '../interfaces/guild.interface';
import type { Model } from 'mongoose';

config();

@Injectable()
export class GuildsService {
	constructor(
        @InjectModel('Guilds') private readonly guilds: Model<Guild>,
	// eslint-disable-next-line no-empty-function
	) {}

	async getGuild(guild: string) {
		return await this.guilds.findOne({
			guildId: guild,
		}).lean();
	}

	async updateFeature(guild: string, data: object) {
		return await this.guilds.updateOne(
			{ guildId: guild },
			{ $set: data },
			{ lean: true },
		);
	}
}

