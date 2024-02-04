import { Poppins } from 'next/font/google';
import { styles } from '@/utils/util';
import Image from 'next/image';

const font = Poppins({
	weight: '400',
	subsets: ['latin', 'latin-ext'],
	style: 'normal',
});

export const Developers = () => (
	<section
		id="developers"
		className={`${styles.paddingY} ${styles.flexCenter} ${font.className} flex-col relative text-white`}
	>
		<div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

		<div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
			<h2 className={styles.heading2}>
					And it's all developed
				<br className="sm:block hidden" /> by one single person.
			</h2>
			<div className="w-full md:mt-0 mt-6 md:ml-60">
				<p
					className={`${styles.paragraph} text-left md:flex-row max-w-[450px]`}
				>
						Despite being a team of one, the developer has poured their heart and soul into Evelyn to create a powerful and reliable Discord bot that will elevate your server experience.
				</p>
			</div>
		</div>

		<div className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
			<div className="flex flex-row">
				<Image
					alt='dev1_pfp'
					src='https://cdn.discordapp.com/avatars/292743562213457920/acd08bbfd0f0c52ef2cb1f548efa84b1.webp?size=512'
					width={512}
					height={512}
					className="h-[75px] w-[75px] rounded-full"
				/>

				<div className={`${font.className} flex-col ml-4`}>
					<h4 className="font-semibold text-[30px] leading-[32px]">
							scrappie
					</h4>
					<p className="text-[20px] leading-[24px] my-[7px] text-dimWhite">
							the only dev
					</p>
				</div>
			</div>

			<p className="text-[18px] leading-[32.4px] my-10">
				I've put more effort into this project than I've put in my exams.
			</p>
		</div>
	</section>
);
