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

/**
 * The styles used by the homepage.
 * @deprecated Will be removed in a future update since they're not being reused anymore.
 */
export const styles = {
	boxWidth: 'xl:max-w-[1280px] w-full',
	boxNav: 'xl:max-w-[1920px] w-full',

	heading2:
		'font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full',
	paragraph:
		'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]',

	flexCenter: 'flex justify-center items-center',
	flexStart: 'flex justify-center items-start',

	paddingX: 'sm:px-16 px-6',
	paddingY: 'sm:py-16 py-6',
	padding: 'sm:px-16 px-6 sm:py-12 py-4',

	marginX: 'sm:mx-16 mx-6',
	marginY: 'sm:my-16 my-6',
};

/** The function used by all @shadcn/ui elements. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
