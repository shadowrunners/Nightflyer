import { styles } from '@/utils/util';
import {
	Developers,
	Features,
	Footer,
	Hero,
	Navbar,
	Stats,
} from '../../components/homepage';

export default function MainPage() {
	return (
		<div className='bg-black w-full overflow-hidden font-poppins font-semibold'>
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