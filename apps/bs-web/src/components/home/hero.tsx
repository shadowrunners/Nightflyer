'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

// TODO: Re-do this completely so it's more modern. Possibly use Aceternity UI.

export function Hero() {
	const t = useTranslations('home');

	return (
		<div className='flex h-screen w-full items-center justify-center overflow-hidden px-4 text-center'>
			<Image
				src='/images/bf_placeholder.png'
				fill={true}
				priority={true}
				alt='coolbg'
				className='absolute inset-0 h-full w-full object-cover opacity-40'
			/>
			<div key='div_gradient_black' className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />
			<div className="px-4 py-10 md:py-20 -mt-35">

			</div>

			<div
				className='flex-1 flex items-center justify-center xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 xl:mt-[-250px] xs:mt-[-350px] relative text-center'
				key='div_content_hero'
			>
				<h1
					className={`text-center text-white`}
					key='hero_main_heading'
				>
					{t('main.hero.main1')} <span className='text-gradient'>{t('main.hero.main2')}</span> {t('main.hero.main3')}
				</h1>
				<p
					className={`max-w-[470px] mt-5`}
					key='hero_main_paragraph'
				>
					{t('main.hero.punchline')}
				</p>
			</div>
		</div>
	);
};
