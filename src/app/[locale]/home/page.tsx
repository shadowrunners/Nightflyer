'use client';

import { GuildSelect } from '@/components/guild';
import { useTranslations } from 'next-intl';

const HomePage = () => {
	const t = useTranslations('dash');

	return (
		<div className='flex flex-col gap-5 ml-5 justify-center text-white'>
			<div className='flex flex-col gap-1 mt-3'>
				<h2 className='text-2xl text-semibold font-poppins'>{t('servers.title')}</h2>
				<h1 className='text-dimWhite text-sm'>{t('servers.description')}</h1>
			</div>
			<GuildSelect />
		</div>
	);
};

export default HomePage;
