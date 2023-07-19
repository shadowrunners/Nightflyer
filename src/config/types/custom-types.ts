/*** Custom feature types. **/

import { z } from 'zod';
import { GuildInfo } from './types';

export type CustomGuildInfo = GuildInfo & {};

/**
 * Define feature ids and it's option types
 */
export type CustomFeatures = {
  music: {};
  gaming: {};
  'reaction-role': {};
  meme: {};
  'anti-phish': {},
  'confessions': ConfessionSystem,
  'welcome': WelcomeFeature;
};

export type ConfessionSystem = {
  channel?: string;
}

export type WelcomeFeature = {
  channel?: string;
  embed?: {
    messagecontent?: string;
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

export const memeFeatureSchema = z.object({
  channel: z.string().optional(),
  source: z.enum(['youtube', 'twitter', 'discord']).optional(),
});

export type MemeFeature = z.infer<typeof memeFeatureSchema>;
