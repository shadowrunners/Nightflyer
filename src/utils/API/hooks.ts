import type { CustomFeatures } from '@/types/features';
import type { HVGuild } from '@/types/types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
	disableFeature,
	enableFeature,
	fetchGuildChannels,
	fetchGuildInfo,
	fetchGuildRoles,
	getFeature,
	updateFeature,
	getGuilds,
	fetchUserInfo,
} from '@/utils/API/fetch';
import { useSession } from 'next-auth/react';
import { APIGuild, APIUser } from '@/types/types';

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
	const { data: session } = useSession();
	return session?.accessToken;
}

const Keys = {
	login: ['login'],
	guild_info: (guild: string) => ['guild_info', guild],
	features: (guild: string, feature: string) => ['feature', guild, feature],
	guildRoles: (guild: string) => ['guild_roles', guild],
	guildChannels: (guild: string) => ['guild_channel', guild],
};

export function useGuilds() {
	const accessToken = getAccessToken();

	return useQuery<APIGuild[]>({
		queryFn: () => getGuilds(accessToken as string),
		queryKey: ['user_guilds'],
	}, client);
}

export function useSelfUserQuery() {
	const accessToken = getAccessToken();

	return useQuery<APIUser>({
		queryFn: () => fetchUserInfo(accessToken as string),
		queryKey: ['users', 'me'],
	}, client);
}

export function useGuildInfoQuery(guild: string) {
	const { data: session, status } = useSession();

	return useQuery<HVGuild | null>({
		queryFn: async () => await fetchGuildInfo(guild, session?.accessToken as string),
		queryKey: Keys.guild_info(guild),
		enabled: status === 'authenticated',
	}, client);
}

export function useFeatureQuery<K extends keyof CustomFeatures>(guild: string, feature: K) {
	const { data: session, status } = useSession();

	return useQuery({
		queryFn: () => getFeature(guild, feature, session?.accessToken as string),
		queryKey: Keys.features(guild, feature),
		enabled: status === 'authenticated',
	}, client);
}

type EnableFeatureOptions = { guild: string; feature: string; enabled: boolean };
export function useEnableFeatureMutation() {
	const { data: session } = useSession();

	return useMutation({
		mutationFn: async ({ enabled, guild, feature }: EnableFeatureOptions) => {
			if (enabled) return enableFeature(session?.accessToken as string, guild, feature);
			return disableFeature(guild, feature, session?.accessToken as string);
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
	const { data: session } = useSession();

	return useMutation({
		mutationFn: (options: UpdateFeatureOptions) => {
			return updateFeature(options.guild, options.feature, options.options, session?.accessToken as string);
		},
		onSuccess: (updated, options) => {
			const key = Keys.features(options.guild, options.feature);
			return client.setQueryData(key, updated);
		},
	}, client);
}

export function useGuildRolesQuery(guild: string) {
	const { data: session } = useSession();

	return useQuery({
		queryFn: () => fetchGuildRoles(guild, session?.accessToken as string),
		queryKey: Keys.guildRoles(guild),
	}, client);
}

export function useGuildChannelsQuery(guild: string) {
	const { data: session } = useSession();

	return useQuery({
		queryFn: () => fetchGuildChannels(guild, session?.accessToken as string),
		queryKey: Keys.guildChannels(guild),
	}, client);
}

export function useGuildPreview(guildId: string) {
	const { data } = useGuilds();
	const guild = data?.find((g) => g.id === guildId);

	return { guild, data };
}
