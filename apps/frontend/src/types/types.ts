// noinspection ShiftOutOfRangeJS,JSUnusedGlobalSymbols

/** The override type. */
export type Override<T, R> = Omit<T, keyof R> & R;

/** The role data coming from the API. */
export type APIRole = {
    /** The role's ID. */
    id: string;
    /** The role's name. */
    name: string;
    /** The role's color. */
    color: number;
    /** The role's position. */
    position: number;
    /** The icon object of the role. */
    icon?: {
      /** The role's icon URL. */
      iconUrl?: string;
      /** The role's emoji. */
      emoji?: string;
    };
};

/** The channel data coming from the API. */
export type APIChannel = {
    /** The channel's ID. */
    id: string;
    /** The channel's name. */
    name: string;
    /** The channel's type. */
    type: ChannelTypes;
    /** The parent category of the channel. */
    category?: string;
};

/** The user data coming from the API. */
export type APIUser = {
    /** The user's ID. */
    id: string;
    /** The user's username. */
    username: string;
    /** The user's avatar URL (probably hash, don't remember). */
    avatar: string;
    /** The user's locale. */
    locale?: string;
    /** The user's flags. */
    flags?: number;
};

/** The guild data coming from the API. */
export type APIGuild = {
    /** The guild's ID. */
    id: string;
    /** The guild's name. */
    name: string;
    /** The guild's icon hash. */
    icon: string;
    /** The user's permission in the specific guild. */
    permissions: string;
};


// eslint-disable-next-line no-shadow
export enum PermissionFlags {
    CREATE_INSTANT_INVITE = 1 << 0,
    KICK_MEMBERS = 1 << 1,
    BAN_MEMBERS = 1 << 2,
    ADMINISTRATOR = 1 << 3,
    MANAGE_CHANNELS = 1 << 4,
    MANAGE_GUILD = 1 << 5,
    ADD_REACTIONS = 1 << 6,
    VIEW_AUDIT_LOG = 1 << 7,
    PRIORITY_SPEAKER = 1 << 8,
    STREAM = 1 << 9,
    VIEW_CHANNEL = 1 << 10,
    SEND_MESSAGES = 1 << 11,
    SEND_TTS_MESSAGES = 1 << 12,
    MANAGE_MESSAGES = 1 << 13,
    EMBED_LINKS = 1 << 14,
    ATTACH_FILES = 1 << 15,
    READ_MESSAGE_HISTORY = 1 << 16,
    MENTION_EVERYONE = 1 << 17,
    USE_EXTERNAL_EMOJIS = 1 << 18,
    VIEW_GUILD_INSIGHTS = 1 << 19,
    CONNECT = 1 << 20,
    SPEAK = 1 << 21,
    MUTE_MEMBERS = 1 << 22,
    DEAFEN_MEMBERS = 1 << 23,
    MOVE_MEMBERS = 1 << 24,
    USE_VAD = 1 << 25,
    CHANGE_NICKNAME = 1 << 26,
    MANAGE_NICKNAMES = 1 << 27,
    MANAGE_ROLES = 1 << 28,
    MANAGE_WEBHOOKS = 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
    USE_APPLICATION_COMMANDS = 1 << 31,
    REQUEST_TO_SPEAK = 1 << 32,
    MANAGE_EVENTS = 1 << 33,
    MANAGE_THREADS = 1 << 34,
    CREATE_PUBLIC_THREADS = 1 << 35,
    CREATE_PRIVATE_THREADS = 1 << 36,
    USE_EXTERNAL_STICKERS = 1 << 37,
    SEND_MESSAGES_IN_THREADS = 1 << 38,
    USE_EMBEDDED_ACTIVITIES = 1 << 39,
    MODERATE_MEMBERS = 1 << 40,
}

// eslint-disable-next-line no-shadow
export enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
}

export type Styles = {
    boxWidth: string;
    boxNav: string;
    heading2: string;
    paragraph: string;
    flexCenter: string;
    flexStart: string;
    paddingX: string;
    paddingY: string;
    padding: string;
    marginX: string;
    marginY: string;
};

/** The guild information retrieved from the Hivemind API. */
export type HVGuild = {
    /** The guild's ID. */
    id?: string;
    /** The guild's name. */
    name?: string;
    /** The guild's icon hash. */
    icon?: string;
    /** The guild's enabled features. */
    enabledFeatures?: string[];
}
