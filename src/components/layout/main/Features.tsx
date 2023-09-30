'use client';

import { observerHook, styles, variants } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Features = () => {
	const [isElementInView, setInView] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		observerHook(ref, setInView);
	}, []);

	return (
		<motion.section
			id="features"
			ref={ref}
			variants={variants}
			initial='hidden'
			animate={ isElementInView ? 'visible' : 'hidden' }
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

			<div className="grid gap-3 lg:grid-cols-3 flex-col md:flex-row px-10 py-12 rounded-[20px] md:mr-5">
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card">
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<Image
							width={32}
							height={32}
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

				<div className={'px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'}>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<Image
							width={32}
							height={32}
							src="https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evelyn/shield.webp"
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


				<div className={'px-10 py-12 rounded-[20px] md:mr-5 my-5 feedback-card'}>
					<div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
						<Image
							width={64}
							height={64}
							src="./send.svg"
							className="object-contain w-auto h-auto"
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
		// </Fragment>
	);
};

export default Features;