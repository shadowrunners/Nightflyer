import { styles } from '@/utils/utils';
import Router from 'next/router';
import Image from 'next/image';

const Footer = () => (
	<section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
		<div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
			<div className="flex-1 flex flex-col justify-start mr-10">
				<Image
					width={128}
					height={128}
					src='https://res.cloudinary.com/shadowrunners/image/upload/v1687690764/evl_logo.webp'
					alt="evelyn"
					className="w-[128px] h-[128px] object-contain"
				/>
				<p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
          Unleash the full potential of your server.
				</p>
			</div>

			<div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
				<div className="flex flex-col ss:my-0 my-4 min-w-[150px]">
					<h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
            Links
					</h4>
					<ul className="list-none mt-4">
						<li
							key="privacy"
							className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer"
							onClick={() => Router.replace('/privacy')}
						>
              Privacy Policy
						</li>
						<li
							key="tos"
							className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mt-3"
							onClick={() => Router.replace('/tos')}
						>
              Terms of Service
						</li>
					</ul>
				</div>
			</div>
			<div>
				<ul>
					<img src="https://res.cloudinary.com/shadowrunners/image/upload/v1687549856/pwrdbyvercel.svg" alt="vercel" className="mb-2" />
					<img src="https://res.cloudinary.com/shadowrunners/image/upload/v1687690774/pwrdbycfworkers.webp" alt="cfworkers" className="mb-2" />
					<img src="https://res.cloudinary.com/shadowrunners/image/upload/v1687690764/pwrdbycldnry.webp" alt="cldnry" />
				</ul>

			</div>
		</div>

		<div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
			<p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white ">
        © 2023 Shadowrunners, all rights reserved. Made with 💝 by scrappie.
			</p>
		</div>
	</section>
);

export default Footer;