import { Music, Shield, Send, Ticket } from 'lucide-react';
import { FeatureCard } from '../ui/featurecard';
import { useTranslations } from 'next-intl';

// TODO: styling is kinda borked on mobile (text doesn't span the entire card), needs a fix.

const features = [
	{
		name: 'features.feature1.name',
		description: 'features.feature1.description',
		icon: Music,
		additionalInfo: 'features.feature1.additionalInfo',
	},
	{
		name: 'features.feature2.name',
		description: 'features.feature2.description',
		icon: Shield,
		additionalInfo: 'features.feature2.additionalInfo',
	},
	{
		name: 'features.feature3.name',
		description: 'features.feature3.description',
		icon: Send,
		additionalInfo: 'features.feature3.additionalInfo',
	},
	{
		name: 'features.feature4.name',
		description: 'features.feature4.description',
		icon: Ticket,
		additionalInfo: 'features.feature4.additionalInfo',
	},
	{
		name: 'features.feature5.name',
		description: 'features.feature5.description',
		icon: Shield,
		additionalInfo: 'features.feature5.additionalInfo',
	},
	{
		name: 'features.feature6.name',
		description: 'features.feature6.description',
		icon: Shield,
		additionalInfo: 'features.feature6.additionalInfo',
	},
	{
		name: 'features.feature7.name',
		description: 'features.feature7.description',
		icon: Shield,
		additionalInfo: 'features.feature7.additionalInfo',
	},
	{
		name: 'features.feature8.name',
		description: 'features.feature8.description',
		icon: Shield,
		additionalInfo: 'features.feature8.additionalInfo',
	},
];

export function Features() {
	const t = useTranslations('home');

	return (
		<section className='mb-20'>
			<div className='max-w-7xl mx-auto px-6 text-white'>
				<h3 className='font-semibold text-[40px] xs:text-[48px]'>{t('features.header.title')}</h3>
				<p className='mt-5 text-[18px] leading-[30.8px] max-w-2xl text-neutral-400'>
					{t('features.header.description')}
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-6 mt-12 text-white'>
				{features.map((feature, i) => (
					<FeatureCard
						key={`feature_${feature.name}_key`}
						title={t(feature.name)}
						description={t(feature.description) ?? ''}
						icon={<feature.icon />}
						index={i}
						additionalInfo={t(feature.additionalInfo)}
					/>
				))}
			</div>
		</section>
	);
}