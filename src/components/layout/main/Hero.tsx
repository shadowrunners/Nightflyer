'use client';

import { observerHook, styles, variants } from '@/utils/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Hero = () => {
	const [isElementInView, setInView] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const translation = useTranslations('main');

	useEffect(() => {
		observerHook(ref, setInView);
	}, []);

	return (
		<section key="home_section" id="home" className={'flex md:flex-row flex-col h-screen text-center'}>
			<Image
				src='https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evl1_idtuxu.webp'
				fill={true}
				priority={true}
				alt='coolbg'
				className='absolute inset-0 object-cover opacity-40 z-0'
			/>
			<div key='div_gradient_black' className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />

			<div
				className={'flex-1 flex items-center justify-center xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 xl:mt-[-250px] xs:mt-[-350px] relative text-center'}
				key='div_content_hero'
			>
				<AnimatePresence>
					<motion.h1
						ref={ref}
						variants={variants}
						initial='hidden'
						animate={ isElementInView ? 'visible' : 'hidden' }
						transition={{ delay: 1.0 }}
						className={`${styles.heading2} text-center`}
						key='hero_main_heading'
					>
						{translation('hero_main1')} <span className='text-gradient'>{translation('hero_main2')}</span> {translation('hero_main3')}
					</motion.h1>
					<motion.p
						ref={ref}
						variants={variants}
						initial='hidden'
						animate={ isElementInView ? 'visible' : 'hidden' }
						transition={{ delay: 1.3 }}
						className={`${styles.paragraph} max-w-[470px] mt-5`}
						key='hero_main_paragraph'
					>
						{translation('hero_punchline')}
					</motion.p>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Hero;
