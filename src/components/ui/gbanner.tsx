import { useTranslations } from 'next-intl';

export function Banner() {
	const t = useTranslations('dash');

	return (
		<div className='flex flex-col px-5 lg:px-8 mt-5 py-5 lg:py-7 black2 rounded-2xl bg-cover gap-1'>
			<h1 className='text-white text-2xl font-bold'>
				{t('banner.title')}
			</h1>
			<h1 color="whiteAlpha.800">{t('banner.description')}</h1>
		</div>
	);
}
