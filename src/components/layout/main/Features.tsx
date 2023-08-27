import React, { useEffect, useRef, useState } from 'react';
import { styles } from '@/utils/utils';
import { motion } from 'framer-motion';

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
				className={'w-full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'}
			>
				<h2 className={`${styles.heading2} text-center`}>Features</h2>
				<p className={`${styles.paragraph} text-center mt-5`}>
					Supercharge your Discord experience to a new level with Evelyn's
					powerful toolkit, packed with an array of exciting features!
				</p>
			</div>

			<div className="flex flex-col md:flex-row px-10 py-12 rounded-[20px] md:mr-5">
				<div className={'md:w-[33.33%] px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'}>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<img
							src="https://res.cloudinary.com/shadowrunners/image/upload/v1683319996/evelyn/music.webp"
							className="w-[50%] h-[50%] object-contain"
							alt="Music Feature"
						/>
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
							Music
						</h4>
						<p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
							With the music module, you can make your gaming sessions inside
							voice channels even more enjoyable. You can play music from
							numerous platforms such as Deezer, Spotify and more! (except YouTube and YT Music)
						</p>
					</div>
				</div>

				<div className={'md:w-[33.3%] px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'}>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<img
							src="https://res.cloudinary.com/shadowrunners/image/upload/v1683319996/evelyn/shield.webp"
							className="w-[50%] h-[50%] object-contain"
							alt="Overwatch Feature"
						/>
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
							Overwatch
						</h4>
						<p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
							Keep your server safe with Overwatch, the ultimate moderation toolkit containing anti-scamming, auto moderation, logging and verification systems.
						</p>
					</div>
				</div>


				<div className={'md:w-[33.3%] px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'}>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<img
							src="https://res.cloudinary.com/shadowrunners/image/upload/v1683319996/evelyn/send.webp"
							className="w-[45%] h-[50%] object-contain"
							alt="WL_FW Feature"
						/>
					</div>
					<div className="flex-1 flex flex-col ml-3 mt-3">
						<h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
							Welcomer / Farewell
						</h4>
						<p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
							Say hello and farewell in style with Evelyn's customizable welcome and goodbye system, featuring fully customizable embeds and messages.
						</p>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default Features;
