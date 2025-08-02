import { Schema, model } from 'mongoose';

export interface EmbedInterface {
	/** The message that will be sent alongside the embed. If defined, that is otherwise it doesn't do shit. */
	content: string;
	/** The title of the embed. */
	title: string;
	/** The description of the embed. */
	description: string;
	/** The color of the embed. */
	color: `#${string}`;
	/** The author object. */
	author: {
		/** The name of the author. */
		name: string;
		/** The icon URL of the author. */
		icon_url: string;
	};
	/** The image object. */
	image: {
		/** The URL of the image. */
		url: string;
	};
	/** The thumbnail object. */
	thumbnail: {
		/** The URL of the thumbnail. */
		url: string;
	};
	/** The footer object. */
	footer: {
		/** The text of the footer. */
		text: string;
		/** The icon URL of the footer. */
		icon_url: string;
	};
}

type Guild = {
	/** The ID of the server. */
	guildId: string;

	/** The AutoMod configuration. */
	automod: {
		/** The channel where AutoMod alerts will be sent. */
		alertsChannel: string;

		/** The Anti Mention Spam submodule's config. */
		mentionspam: {
			/** Indicates if the mention spam submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti Profanity submodule's config. */
		profanity: {
			/** Indicates if the profanity submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti NSFW Invite Links submodule's config. */
		nsfwinvitelinks: {
			/** Indicates if the NSFW invite links submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti Sexual Content submodule's config. */
		sexualcontent: {
			/** Indicates if the sexual content submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti Invite Links configuration. */
		invitelinks: {
			/** Indicates if the invite links submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti Spam submodule's config. */
		spam: {
			/** Indicates if the spam submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Anti Zalgo Text submodule's config. */
		zalgo: {
			/** Indicates if the zalgo text submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Emoji Spam submodule's config. */
		emojispam: {
			/** Indicates if the emoji spam submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};

		/** The Custom Keyword submodule's config. */
		customkeyword: {
			/** Indicates if the custom keyword submodule is enabled or not. */
			enabled: boolean;
			/** The ID of the rule. */
			ruleId: string;
		};
	}

	antiphishing: {
		/** Indicates if the anti-phishing system is enabled or not. */
		enabled: boolean;
		/** The ID of the system's webhook. */
		webhookId: string;
	};

	confessions: {
		/** Indicates if the confessions system is enabled or not. */
		enabled: boolean;
		/** The ID of the system's webhook. */
		webhookId: string;
	};

	logs: {
		/** Indicates if the logging system is enabled or not. */
		enabled: boolean;
		/** The ID of the system's webhook. */
		webhookId: string;
	};

	welcome: {
		/** Indicates if the welcome system is enabled or not. */
		enabled: boolean;
		/** The ID of the channel where the welcome will send messages in. */
		channel: string;
		/** The object housing the embed data. */
		embed: EmbedInterface;
	};

	goodbye: {
		/** Indicates if the goodbye system is enabled or not. */
		enabled: boolean;
		/** The ID of the channel where the goodbye will send messages in. */
		channel: string;
		/** The object housing the embed data. */
		embed: EmbedInterface;
	};

	blacklist: {
		/** Indicates if the server is blacklisted or not. */
		isBlacklisted: boolean;
		/** The reason the server is blacklisted for. */
		reason: string;
		/** When the server was blacklisted. */
		time: number;
	};

	tickets: {
		/** Indicates if the tickets system is enabled or not. */
		enabled: boolean;
		/** The object housing the embed data. */
		embed: EmbedInterface;
		/** The ID of the channel where the transcripts will be sent in. */
		transcriptChannel: string;
		/** The ID of the role that will be pinged when a new ticket is created. */
		staffRole: string;
	};

	levels: {
		/** Indicates if the levelling system is enabled or not. */
		enabled: boolean;
		/** The ID of the channel where the level up messages will be sent in. */
		channel: string;
		/** The message that will be sent when someone levels up. */
		message: string;
		/** The array of restricted roles. */
		restrictedRoles: string[];
		/** The array of restricted channels. */
		restrictedChannels: string[];
	};
}

export const Guilds = model<Guild>(
	'Guilds',
	new Schema({
		guildId: { type: String },
		automod: {
			enabled: { type: Boolean },
			mentionSpam: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			profanity: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			sexualContent: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			spam: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			customKeyWord: {
				enabled: { type: Boolean },
				ruleId: { type: String },
				keyword: { type: String },
			},
			zalgo: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			emojiSpam: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
			inviteLinks: {
				enabled: { type: Boolean },
				ruleId: { type: String },
			},
		},
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
			roleRewards: [
				{
					level: Number,
					roleId: String,
				},
			],
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
	})
)