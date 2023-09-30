import { useTranslations } from 'next-intl';
import { styles } from '@/utils/utils';

const PrivacyPolicy = () => {
	const t = useTranslations('privacy');
	return (
		<div>
			<div className={`${styles.flexStart} text-white`}>
				<div className={`${styles.boxWidth}`}>
					<section id="home" className={'flex md:flex-row flex-col'}>
						<div className={`flex-1 ${styles.flexStart} xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 relative`}>
							<h1 className={`${styles.heading2}`}>Privacy Policy</h1>
							<p className={`${styles.paragraph}`}>This Privacy Policy outlines the data collection, usage, and protection practices employed by the Shadowrunners team regarding Evelyn.</p>
							<p className={`${styles.paragraph}`}>Last Updated: August 7th, 2023</p>

							<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
								{t('section1_q')}
							</h4>
							<p>{t('section1_r')}</p>

							<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
								{t('section2_q')}
							</h4>
							<p>
								{t('section2_r')}
								<br />
								<br />
								{t('section2_r2')}
							</p>

							<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
								{t('section3_q')}
							</h4>
							<p>{t('section3_r')}</p>

							<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
								{t('section4_q')}
							</h4>
							<p>{t('section4_r')}</p>

							<p className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
								{t('agreement')}
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
