/** This file houses all the types for Features. */

import { ReactElement, ReactNode } from 'react';
import {
	useAntiPhishFeature,
	useConfessionSystem,
	useGoodbyeSystem,
	useLevellingSystem,
	useLogsSystem,
	useTicketSystem,
	useVerifySystem,
	useWelcomeFeature,
} from '@/features';

import { GiTalk } from 'react-icons/gi';
import { MdMessage } from 'react-icons/md';
import type { UseFormRender } from '@/types/formTypes';

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

type FeaturesConfig = {
    [K in keyof CustomFeatures]: FeatureConfig<K>;
};

export interface FeatureConfig<K extends keyof CustomFeatures> {
    name: ReactNode;
    description?: ReactNode;
    icon?: ReactElement;
    /**
     * Render content in Feature view
     */
    useRender: UseFormRender<CustomFeatures[K]>;
    /**
     * Render skeleton before feature is loaded
     */
    useSkeleton?: () => ReactNode;
}

/** This is where the information for every feature is. */
export const Features: FeaturesConfig = {
	antiphishing: {
		name: 'Anti-Phishing',
		description: 'Protects your server against scammers.',
		icon: <GiTalk />,
		useRender: useAntiPhishFeature,
	},
	confessions: {
		name: 'Confessions',
		description: 'Sends an anonymous message to a designated channel.',
		icon: <GiTalk />,
		useRender: useConfessionSystem,
	},
	goodbye: {
		name: 'Goodbye',
		description: 'Sends a custom message when a user joins the server.',
		icon: <MdMessage />,
		useRender: useGoodbyeSystem,
	},
	logs: {
		name: 'Logs',
		description: 'Logs every single mod(s) action / server change to a designated channel.',
		icon: <GiTalk />,
		useRender: useLogsSystem,
	},
	levelling: {
		name: 'Levelling',
		description: 'Makes chatting more rewarding by introducing an XP system.',
		icon: <GiTalk />,
		useRender: useLevellingSystem,
	},
	tickets: {
		name: 'Tickets',
		description: 'Makes chatting more rewarding by introducing an XP system.',
		icon: <GiTalk />,
		useRender: useTicketSystem,
	},
	verification: {
		name: 'Verification',
		description: 'Sends a custom message when a user joins the server',
		icon: <MdMessage />,
		useRender: useVerifySystem,
	},
	welcome: {
		name: 'Welcome',
		description: 'Sends a custom message when a user joins the server',
		icon: <MdMessage />,
		useRender: useWelcomeFeature,
	},
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

export type IdFeature<K extends keyof CustomFeatures = keyof CustomFeatures> = FeatureConfig<K> & {
    id: K;
};