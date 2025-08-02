/* eslint-disable indent */
import { MailQuestion, Diff, Ticket, Scroll, MessageSquare, Shield, FishOff } from 'lucide-react';
import type { EvelynFeature } from '~/types';
import { type ClassValue, clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

/**
 *
 * @param type The type of feature array that will be returned.
 * @param guildId The ID of the guild.
 * @returns An array of features.
 */
export function getFeatures(type: 'sidebar' | 'cards', guildId?: string): EvelynFeature[] {
	const t = useTranslations('dash');

	const baseFeatures = [
		{
			baseName: 'antiphishing',
			name: t('features.antiphishing.title'),
			icon: FishOff,
		},
		{
			baseName: 'automod',
			name: t('features.automod.title'),
			icon: Shield,
		},
		{
			baseName: 'confessions',
			name: t('features.confessions.title'),
			icon: MailQuestion,
		},
		{
			baseName: 'goodbye',
			name: t('features.goodbye.title'),
			icon: MessageSquare,
		},
		{
			baseName: 'levelling',
			name: t('features.levelling.title'),
			icon: Diff,
		},
		{
			baseName: 'logs',
			name: t('features.logs.title'),
			icon: Scroll,
		},
		{
			baseName: 'tickets',
			name: t('features.tickets.title'),
			icon: Ticket,
		},
		{
			baseName: 'welcome',
			name: t('features.welcome.title'),
			icon: MessageSquare,
		},
	];

	switch (type) {
		case 'cards': {
			return baseFeatures.map((feature) => ({
				description: t(`features.${feature.baseName}.description`),
				href: `/features/${feature.baseName}`,
				...feature,
			}));
		}
		case 'sidebar': {
			return baseFeatures.map((feature) => ({
				href: `/guilds/${guildId}/features/${feature.baseName}`,
				...feature,
			}));
		}
	}
}

/** The function used by all @shadcn/ui elements. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
