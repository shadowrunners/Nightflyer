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

import { LuDiff, LuMailQuestion, LuScrollText, LuTicket } from 'react-icons/lu';
import { MdMessage, MdPhishing } from 'react-icons/md';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import type { UseFormRender } from '@/types/formTypes';
import { useTranslations } from 'next-intl';

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
export const Features = () => {
	const t = useTranslations('dash');

	return {
		antiphishing: {
			name: t('features.antiphishing.title'),
			description: t('features.antiphishing.description'),
			icon: <MdPhishing />,
			useRender: useAntiPhishFeature,
		},
		confessions: {
			name: t('features.confessions.title'),
			description: t('features.confessions.description'),
			icon: <LuMailQuestion />,
			useRender: useConfessionSystem,
		},
		goodbye: {
			name: t('features.goodbye.title'),
			description: t('features.goodbye.description'),
			icon: <MdMessage />,
			useRender: useGoodbyeSystem,
		},
		logs: {
			name: t('features.logs.title'),
			description: t('features.logs.description'),
			icon: <LuScrollText />,
			useRender: useLogsSystem,
		},
		levelling: {
			name: t('features.levelling.title'),
			description: t('features.levelling.description'),
			icon: <LuDiff />,
			useRender: useLevellingSystem,
		},
		tickets: {
			name: t('features.tickets.title'),
			description: t('features.tickets.description'),
			icon: <LuTicket />,
			useRender: useTicketSystem,
		},
		verification: {
			name: t('features.verification.title'),
			description: t('features.verification.description'),
			icon: <IoShieldCheckmarkSharp />,
			useRender: useVerifySystem,
		},
		welcome: {
			name: t('features.welcome.title'),
			description: t('features.welcome.description'),
			icon: <MdMessage />,
			useRender: useWelcomeFeature,
		},
	};
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