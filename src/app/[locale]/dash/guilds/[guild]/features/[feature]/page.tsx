'use client';

import { UpdateFeaturePanel } from '@/components/feature/UpdateFeaturePanel';
import getGuildLayout from '@/components/layout/guild/get-guild-layout';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { CustomFeatures, FeatureConfig } from '@/config/types';
import { Button } from '@/components/ui';
import { features } from '@/config/features';
import { BsSearch } from 'react-icons/bs';
import { useEnableFeatureMutation, useFeatureQuery } from '@/api/hooks';
import { Fragment, ReactNode } from 'react';
import React from 'react';
import { useTranslations } from 'next-intl';

export type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

const FeaturePage = ({ params }: { params: { feature: keyof CustomFeatures, guild: string } }) => {
	const { feature, guild } = params;
	console.log(`Feature page params: ${JSON.stringify(params)}`);

	const query = useFeatureQuery(guild, feature);
	const featureConfig = features[feature] as FeatureConfig<typeof feature>;
	const skeleton = featureConfig?.useSkeleton?.();

	if (featureConfig == null) return <NotFound />;
	if (query.isError) return <NotEnabled guild={params.guild} feature={params.feature} />;
	if (query.isLoading) return skeleton != null ? <Fragment>{skeleton}</Fragment> : <LoadingPanel />;
	return <UpdateFeaturePanel key={feature} guild={guild} featureId={feature} feature={query.data} config={featureConfig} />;
};

function NotEnabled({ guild, feature }: Params) {
	const t = useTranslations('error');
	const t2 = useTranslations('dash');
	const enable = useEnableFeatureMutation();

	return (
		<div className='flex justify-center items-center flex-col h-full gap-1'>
			<h1 className='text-xl text-semibold text-white'>
				{t('not_enabled')}
			</h1>
			<p className='text-dimWhite'>{t('not_enabled_desc')}</p>
			<Button
				className='mt-3 px-6'
				onClick={() => enable.mutate({ enabled: true, guild, feature })}
			>
				{t2('button.enablefeature')}
			</Button>
		</div>
	);
}

function NotFound() {
	const t = useTranslations('error');

	return (
		<div className='flex justify-center items-center flex-col h-full gap-2'>
			<BsSearch className='w-[50px] h-[50px]' />
			<h2 className='text-xl xl:text-lg text-white'>{t('not_found')}</h2>
			<p className='text-dimWhite'>{t('not_found_desc')}</p>
		</div>
	);
}

FeaturePage.getLayout = (c: ReactNode) => getGuildLayout({ children: c, back: true });
export default FeaturePage;
