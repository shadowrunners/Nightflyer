import { Navbar, Footer } from '@/components/layout/main/index';
import { styles } from '@/utils/utils';
import { ReactNode } from 'react';

export default function PrivacyLayout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-black w-full overflow-hidden font-poppins'>
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
