import type { CustomFeatures } from '@/types/features';
import type { HVGuild } from '@/types/types';
import { APIGuild, APIUser } from '@/types/types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
	disableFeature,
	enableFeature,
	fetchGuildChannels,
	fetchGuildInfo,
	fetchGuildRoles,
	fetchUserInfo,
	getFeature,
	getGuilds,
	updateFeature,
} from '@/utils/API/fetch';
import { useSession } from 'next-auth/react';

export const client = new QueryClient({
	defaultOptions: {
		mutations: {
			retry: 0,
		},
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			retry: 0,
		},
	},
});

/** Gets the access token from the session. */
function getAccessToken() {
	const { data: session, status } = useSession();

	return { session: session?.accessToken, status };
}

const Keys = {
	login: ['login'],
	guild_info: (guild: string) => ['guild_info', guild],
	features: (guild: string, feature: string) => ['feature', guild, feature],
	guildRoles: (guild: string) => ['guild_roles', guild],
	guildChannels: (guild: string) => ['guild_channel', guild],
};

export function useGuilds() {
	const { session, status } = getAccessToken();

	return useQuery<APIGuild[]>({
		queryFn: async () => await getGuilds(session!),
		queryKey: ['user_guilds'],
		enabled: status === 'authenticated',
	}, client);
}

export function useSelfUserQuery() {
	const { session, status } = getAccessToken();

	return useQuery<APIUser>({
		queryFn: async () => await fetchUserInfo(session!),
		queryKey: ['users', 'me'],
		enabled: status === 'authenticated',
	}, client);
}

export function useGuildInfoQuery(guild: string) {
	const { session, status } = getAccessToken();

	return useQuery<HVGuild | null>({
		queryFn: async () => await fetchGuildInfo(guild, session!),
		queryKey: Keys.guild_info(guild),
		enabled: status === 'authenticated',
	}, client);
}

export function useFeatureQuery<K extends keyof CustomFeatures>(guild: string, feature: K) {
	const { session, status } = getAccessToken();

	return useQuery({
		queryFn: async () => await getFeature(guild, feature, session!),
		queryKey: Keys.features(guild, feature),
		enabled: status === 'authenticated',
	}, client);
}

type EnableFeatureOptions = { guild: string; feature: string; enabled: boolean };
export function useEnableFeatureMutation() {
	const { session } = getAccessToken();

	return useMutation({
		mutationFn: async ({ enabled, guild, feature }: EnableFeatureOptions) => {
			if (enabled) return await enableFeature(session!, guild, feature);
			return await disableFeature(guild, feature, session!);
		},
		onSuccess: async (_, { guild, feature, enabled }) => {
			await client.invalidateQueries({ queryKey: Keys.features(guild, feature) });
			client.setQueryData<HVGuild | null>(Keys.guild_info(guild), (prev) => {
				if (prev === null) return null;

				if (enabled) return {
					...prev,
					enabledFeatures: prev?.enabledFeatures?.includes(feature)
						? prev.enabledFeatures
						: [...prev?.enabledFeatures as string[], feature],
				};

				else return {
					...prev,
					enabledFeatures: prev?.enabledFeatures?.filter((f) => f !== feature),
				};
			});
		},
	}, client);
}

type UpdateFeatureOptions = {
  guild: string;
  feature: keyof CustomFeatures;
  options: FormData | string;
};

export function useUpdateFeatureMutation() {
	const { session } = getAccessToken();

	return useMutation({
		mutationFn: async (options: UpdateFeatureOptions) => {
			return await updateFeature(options.guild, options.feature, options.options, session!);
		},
		onSuccess: (updated, options) => {
			const key = Keys.features(options.guild, options.feature);
			return client.setQueryData(key, updated);
		},
	}, client);
}

export function useGuildRolesQuery(guild: string) {
	const { session } = getAccessToken();

	return useQuery({
		queryFn: async () => await fetchGuildRoles(guild, session!),
		queryKey: Keys.guildRoles(guild),
	}, client);
}

export function useGuildChannelsQuery(guild: string) {
	const { session } = getAccessToken();

	return useQuery({
		queryFn: async () => await fetchGuildChannels(guild, session!),
		queryKey: Keys.guildChannels(guild),
	}, client);
}

export function useGuildPreview(guildId: string) {
	const { data } = useGuilds();
	const guild = data?.find((g) => g.id === guildId);

	return { guild, data };
}
