import { CustomFeatures, CustomGuildInfo } from '@/config/types/custom-types';
import { callDefault, callReturn } from '@/utils/fetch/core';
import { botRequest } from '@/utils/fetch/requests';
import type { Role, GuildChannel } from '@/utils/types';
import { Session } from 'next-auth';

/**
 * Gets the custom information about the guild from the backend.
 * @param session
 * @param guild Guild ID
 * @return The information if the user is in the guild otherwise null.
 */
export async function fetchGuildInfo(
	session: Session | null,
	guild: string,
): Promise<CustomGuildInfo | null> {
	return await callReturn<CustomGuildInfo | null>(
		`/guilds/${guild}`,
		botRequest(<Session>session, {
			request: {
				method: 'GET',
			},
			allowed: {
				404: () => null,
			},
		}),
	);
}

export async function enableFeature(session: Session | null, guild: string, feature: string) {
	return await callDefault(
		`/guilds/${guild}/features/${feature}`,
		botRequest(<Session>session, {
			request: {
				method: 'POST',
			},
		}),
	);
}

export async function disableFeature(session: Session | null, guild: string, feature: string) {
	return await callDefault(
		`/guilds/${guild}/features/${feature}`,
		botRequest(<Session>session, {
			request: {
				method: 'DELETE',
			},
		}),
	);
}

export async function getFeature<K extends keyof CustomFeatures>(
	session: Session | null,
	guild: string,
	feature: K,
): Promise<CustomFeatures[K]> {
	return await callReturn<CustomFeatures[K]>(
		`/guilds/${guild}/features/${feature}`,
		botRequest(<Session>session, {
			request: {
				method: 'GET',
			},
		}),
	);
}

export async function updateFeature<K extends keyof CustomFeatures>(
	session: Session | null,
	guild: string,
	feature: 'antiphishing' | 'confessions' | 'goodbye' | 'logs' | 'levelling' | 'tickets' | 'verification' | 'welcome',
	options: FormData | string,
): Promise<CustomFeatures[K]> {
	const isForm = options instanceof FormData;

	return await callReturn<CustomFeatures[K]>(
		`/guilds/${guild}/features/${feature}`,
		botRequest(<Session>session, {
			request: {
				method: 'PATCH',
				headers: isForm
					? {}
					: {
						'Content-Type': 'application/json',
					},
				body: options,
			},
		}),
	);
}

/**
 * Used for custom forms
 *
 * The dashboard itself doesn't use it
 * @returns Guild roles
 */
export async function fetchGuildRoles(session: Session, guild: string) {
	return await callReturn<Role[]>(
		`/guilds/${guild}/roles`,
		botRequest(session, {
			request: {
				method: 'GET',
			},
		}),
	);
}

/**
 * @returns Guild channels
 */
export async function fetchGuildChannels(session: Session, guild: string) {
	return await callReturn<GuildChannel[]>(
		`/guilds/${guild}/channels`,
		botRequest(session, {
			request: {
				method: 'GET',
			},
		}),
	);
}