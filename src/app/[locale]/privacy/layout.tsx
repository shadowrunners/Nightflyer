import { Navbar, Footer } from '@/components/homepage';
import { Poppins } from 'next/font/google';
import { styles } from '@/utils/util';
import { ReactNode } from 'react';

const inter = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: '500',
});

export default function PrivacyLayout({ children }: { children: ReactNode }) {
	return (
		<div className={`bg-black w-full overflow-hidden ${inter.className}`}>
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxNav}`}>
					<Navbar />
				</div>
			</div>
			<div className={`${styles.flexStart} text-white`}>
				<div className={`${styles.boxWidth}`}>
					{children}
				</div>
			</div>
			<div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Footer />
				</div>
			</div>
		</div>
	);
}
