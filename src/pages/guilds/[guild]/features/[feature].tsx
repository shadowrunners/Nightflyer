import { UpdateFeaturePanel } from '@/components/feature/UpdateFeaturePanel';
import getGuildLayout from '@/components/layout/guild/get-guild-layout';

import { Button } from '@/components/ui/button';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { features } from '@/config/features';
import { CustomFeatures, FeatureConfig } from '@/config/types';
import { BsSearch } from 'react-icons/bs';
import { useEnableFeatureMutation, useFeatureQuery } from '@/api/hooks';
import { feature as view } from '@/config/translations/feature';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { Fragment } from 'react';

export type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

const FeaturePage: NextPageWithLayout = () => {
	const { feature, guild } = useRouter().query as Params;

	const query = useFeatureQuery(guild, feature);
	const featureConfig = features[feature] as FeatureConfig<typeof feature>;
	const skeleton = featureConfig?.useSkeleton?.();

	if (featureConfig == null) return <NotFound />;
	if (query.isError) return <NotEnabled />;
	if (query.isLoading) return skeleton != null ? <Fragment>{skeleton}</Fragment> : <LoadingPanel />;
	return <UpdateFeaturePanel key={feature} feature={query.data} config={featureConfig} />;
};

function NotEnabled() {
	const t = view.useTranslations();
	const { guild, feature } = useRouter().query as Params;
	const enable = useEnableFeatureMutation();

	return (
		<div className='flex justify-center items-center flex-col h-full gap-1'>
			<h1 className='text-xl text-semibold'>
				{t.error['not enabled']}
			</h1>
			<p className='text-dimWhite'>{t.error['not enabled description']}</p>
			<Button
				className='mt-3 px-6'
				onClick={() => enable.mutate({ enabled: true, guild, feature })}
			>
				{t.bn.enable}
			</Button>
		</div>
	);
}

function NotFound() {
	const t = view.useTranslations();

	return (
		<div className='flex justify-center items-center flex-col h-full gap-2'>
			<BsSearch className='w-[50px] h-[50px]' />
			<h2 className='text-xl xl:text-lg'>{t.error['not found']}</h2>
			<p className='text-dimWhite'>{t.error['not found description']}</p>
		</div>
	);
}

FeaturePage.getLayout = (c) => getGuildLayout({ children: c, back: true });
export default FeaturePage;
