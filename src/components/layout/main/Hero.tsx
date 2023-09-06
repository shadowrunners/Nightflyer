import { observerHook, styles, variants } from '@/utils/utils';
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
	const [isElementInView, setInView] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		observerHook(ref, setInView);
	}, []);

	return (
		<section id="home" className={'flex md:flex-row flex-col h-screen text-center'}>
			<Image
				src='https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evl1_idtuxu.webp'
				fill={true}
				alt='coolbg'
				className='absolute inset-0 object-cover opacity-40 z-0'
			/>
			<div className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />

			<div
				className={'flex-1 flex items-center justify-center xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 xl:mt-[-250px] xs:mt-[-350px] relative text-center'}
			>
				<AnimatePresence>
					<motion.h1
						ref={ref}
						variants={variants}
						initial='hidden'
						animate={ isElementInView ? 'visible' : 'hidden' }
						transition={{ delay: 1.0 }}
						className={`${styles.heading2} text-center`}
					>
            Unleash the <span className='text-gradient'>full potential</span> of your server.
					</motion.h1>
					<motion.p
						ref={ref}
						variants={variants}
						initial='hidden'
						animate={ isElementInView ? 'visible' : 'hidden' }
						transition={{ delay: 1.3 }}
						className={`${styles.paragraph} max-w-[470px] mt-5`}
					>
            With Evelyn, the possibilities you've always dreamed of are instantly unlocked. Completely free of charge.
					</motion.p>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Hero;
