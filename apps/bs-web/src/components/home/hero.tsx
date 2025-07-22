'use client';

import { useTranslations } from 'next-intl';

export function Hero() {
	const t = useTranslations('home');

	return (
		<div className='flex h-screen w-full items-center overflow-hidden px-4 text-left'>
			<div key='div_gradient_black' className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />
			<div className='px-4 py-10 md:py-20 -mt-35'>
				<h1 className='relative z-10 mx-auto max-w-4xl text-2xl font-bold font-sans text-slate-300 md:text-4xl lg:text-7xl'>
					{t('main.hero.main')}
				</h1>
				<p className='relative mx-1 z-10 max-w-xl py-4 text-lg text-left font-normal text-neutral-400'>
					{t('main.hero.punchline')}
				</p>
			</div>
		</div>
	);
};
