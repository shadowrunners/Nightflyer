/** * Custom feature types. **/
import { GuildInfo } from './types';

export type CustomGuildInfo = GuildInfo & unknown;

/**
 * Define feature ids and it's option types
 */
export type CustomFeatures = {
  antiphishing: AntiPhishingFeature,
  confessions: ConfessionsFeature,
  goodbye: GoodbyeFeature,
  logs: LogsFeature,
  levelling: LevellingFeature,
  tickets: TicketsFeature,
  verification: VerifyFeature,
  welcome: WelcomeFeature,
};

export type AntiPhishingFeature = {
  channel?: string;
}

export type ConfessionsFeature = {
  channel?: string;
}

export type LogsFeature = {
  channel?: string;
}

export type LevellingFeature = {
  channel?: string;
  message?: string;
}

export type TicketsFeature = {
  transcriptChannel?: string;
  assistantRole?: string;
  embed?: {
    content?: string;
    author?: {
      name?: string;
      iconURL?: string;
    }
    color?: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    image?: string;
    footer?: {
      text?: string;
      iconURL?: string;
    }
  };
}

export type WelcomeFeature = {
  channel?: string;
  embed?: {
    content?: string;
    author?: {
      name?: string;
      iconURL?: string;
    }
    color?: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    image?: string;
    footer?: {
      text?: string;
      iconURL?: string;
    }
  };
};

export type GoodbyeFeature = {
  channel?: string;
  embed?: {
    content?: string;
    author?: {
      name?: string;
      iconURL?: string;
    }
    color?: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    image?: string;
    footer?: {
      text?: string;
      iconURL?: string;
    }
  };
};

export type VerifyFeature = {
  role?: string;
}
