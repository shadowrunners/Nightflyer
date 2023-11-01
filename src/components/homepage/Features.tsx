'use client';

import { useEffect, useRef, useState } from 'react';
import { HiShieldCheck } from 'react-icons/hi';
import { BsSendFill } from 'react-icons/bs';
import { Poppins } from 'next/font/google';
import { FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';

const font = Poppins({
	weight: '400',
	subsets: ['latin', 'latin-ext'],
});

const Features = () => {
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setInView(entry.isIntersecting);
		}, { threshold: 0.3 });
		if (ref.current) observer.observe(ref.current);
		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, []);

	return (
		<motion.section
			id="features"
			ref={ref}
			initial={{ opacity: 0, x: inView ? 0 : -100 }}
			animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<div
				className='w-full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'
			>
				<h2 className={`${styles.heading2} text-center`}>Features</h2>
				<p className={`${styles.paragraph} text-center mt-5`}>
					Supercharge your Discord experience to a new level with Evelyn's
					powerful toolkit, packed with an array of exciting features!
				</p>
			</div>

			<div className={`${font.className} grid gap-3 lg:grid-cols-3 flex-col md:flex-row px-10 py-12 rounded-[20px] md:mr-5 text-white`}>
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card">
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<FaMusic className='w-6 h-6' />
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-semiboldtext-[18px] leading-[23px] mb-1">
							Music
						</h4>
						<p className="text-dimWhite text-[16px] leading-[24px] mb-1">
							With the music module powered by our custom in-house package,
							you can make your gaming sessions inside voice channels even more enjoyable.
							You can play music from numerous platforms such as Deezer, Spotify and more! (except YouTube and YT Music)
						</p>
					</div>
				</div>

				<div className='px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<HiShieldCheck className="w-9 h-9" />
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-semibold text-[18px] leading-[23px] mb-1">
							Overwatch
						</h4>
						<p className="text-dimWhite text-[16px] leading-[24px] mb-1">
							Keep your server safe with Overwatch, the ultimate moderation toolkit containing anti-phishing, auto moderation, logging and verification systems.
						</p>
					</div>
				</div>


				<div className='px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<BsSendFill className="w-7 h-7" />
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-semibold text-[18px] leading-[23px] mb-1">
							Welcomer / Farewell
						</h4>
						<p className="text-dimWhite text-[16px] leading-[24px] mb-1">
							Say hello and farewell in style with Evelyn's customizable welcome and goodbye system, featuring fully customizable embeds and messages.
						</p>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default Features;
