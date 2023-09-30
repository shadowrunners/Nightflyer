import { styles } from '@/utils/utils';
import {
	Developers,
	Features,
	Footer,
	Hero,
	Navbar,
	Stats,
} from '../../components/layout/main/index';
import { Poppins } from 'next/font/google';
import React from 'react';

const inter = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: '600',
});

export default function MainPage() {
	return (
		<div className={`bg-black w-full overflow-hidden ${inter.className}`}>
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxNav}`}>
					<Navbar />
				</div>
			</div>
			<div className={`${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>
			<div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Features /> <Stats /> <Developers />
					<Footer />
				</div>
			</div>
		</div>
	);
}