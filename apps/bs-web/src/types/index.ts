import { IconType } from 'react-icons';
import type { FormProps, SelectMenuOptionArray } from './formTypes';

import type {
	APIGuild,
	RESTGetAPIGuildChannelsResult,
} from 'discord-api-types/v10';
import { UseFormReturn } from 'react-hook-form';
import { ReactElement } from 'react';

export type EvelynFeature = {
    /** The base name of the feature (raw name). */
    baseName?: string;
	/** The name of the feature. */
    name: string;
	/** The description of the feature. */
    description?: string;
	/** The icon of the feature. */
    icon: IconType;
	/** The href of the feature. */
	href?: string;
};

/** The guild data coming from the API. */
export type SPAPIGuild = APIGuild & {
    approximate_channel_count: number;
    channels: RESTGetAPIGuildChannelsResult;
    textChannels: number;
    voiceChannels: number;
    enabledFeatures: string[];
}

export type EvelynCardFeature = EvelynFeature & {
	/** Additional information about the feature. */
	additionalInfo?: string;
}

export type SPAPIPartialGuild = {
	/** The name of the guild. */
	name: string;
	/** The ID of the guild. */
	id: string;
	/** If the bot is present or not. */
	botPresent: boolean;
	/** The full icon URL of the guild. */
	icon: string;
	/** If the user is the owner or not. */
	owner: boolean;
	/** The permissions bit field. */
	permissions: string;
};

export type FormParams = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<any, any>;
	formName?: string;
	formLabel?: string;
	formDescription?: string;
}

type SubmitFn<T> = (data: FormData | string) => Promise<T>;
type UseFormRender<T = unknown> = (data: T, onSubmit: SubmitFn<T>) => UseFormRenderResult;
type UseFormRenderResult = {
	/** The component data of the feature. */
    component: ReactElement;
    /** Indicates if the current change(s) can be saved. */
    canSave?: boolean;
    /** The function that is called upon submitting. */
    onSubmit: () => void;
    /** The function that resets the current value. */
    reset?: () => void;
};

export type {
	FormProps,
	UseFormRender,
	UseFormRenderResult,
	SelectMenuOptionArray,
};