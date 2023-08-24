import { AnimatePresence, motion } from 'framer-motion';
import { styles } from '@/utils/utils';
import { Footer, Navbar } from '@/components/layout/main';

const PrivacyPolicy = () => (
	<div className='bg-black w-full overflow-hidden font-poppins'>
		<div className={`${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxNav}`}>
				<Navbar />
			</div>
		</div>
		<div className={`${styles.flexStart} text-white`}>
			<div className={`${styles.boxWidth}`}>
				<section id="home" className={'flex md:flex-row flex-col'}>
					<div className={`flex-1 ${styles.flexStart} xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 relative`}>
						<h1 className={`${styles.heading2}`}>Privacy Policy</h1>
						<p className={`${styles.paragraph}`}>This Privacy Policy outlines the data collection, usage, and protection practices employed by the Shadowrunners team regarding Evelyn.</p>
						<p className={`${styles.paragraph}`}>Last Updated: August 7th, 2023</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                What data does Evelyn collect and why?
						</h4>
						<p>
                · Evelyn collects public information such as the ID of your server, the ID of the channels (and roles) you select for our systems. Additionally, for integration purposes, we collect webhook related information including IDs and tokens that were exclusively created by Evelyn. We collect this information solely for the purpose of integrating and ensuring that systems such as moderation logging and confessions work properly. Webhook tokens are treated as sensitive and confidential information and thus have additional protection set in place in order to safeguard them from unauthorized access and are not shared with any 3rd parties.
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                Does Evelyn send my data to any 3rd parties?
						</h4>
						<p>
                · By default, Evelyn does not send any information to third party services. However, components such as the anti-phishing component require us to send any message containing URLs to their service to detect and flag harmful links. This process is entirely anonymously and does not expose any identifying information (such as the user's ID or username). Please note that this feature is opt-in, and you have the choice to opt out at any time.
							<br />
							<br />
                Outside of this special case, we do not share or sell your data for advertising or marketing purposes. Additionally, we do not share your personally identifying information with 3rd parties, except when required by law.
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                How is my data stored and handled?
						</h4>
						<p>
                · The collected data is securely stored in a MongoDB database to prevent external access. While extensive security measures are in place, we ("Shadowrunners") cannot guarantee absolute protection against unintentional or malicious breaches of data. In the unlikely event of a breach, all users will be promptly notified through the Discord client application.
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                How is my data stored and handled?
						</h4>
						<p>
                · The collected data is securely stored in a MongoDB database to prevent external access. While extensive security measures are in place, we ("Shadowrunners") cannot guarantee absolute protection against unintentional or malicious breaches of data. In the unlikely event of a breach, all users will be promptly notified through the Discord client application.
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                Underage Users
						</h4>
						<p>
                · Evelyn is designed for individuals aged 13 or older, or in compliance with the minimum age requirements dictated by local laws and regulations. We do not knowingly collect or retain personal information from users who fall below this age threshold. If you are under the specified age limit, we ask that you refrain from using the bot's services. If we become aware that we have inadvertently collected data from an underage user, we will take swift measures to remove the information from our systems and suspend the user's access indefinitely.
						</p>

						<p className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
                By using or interacting with Evelyn, you agree to the terms outlined in this policy. If you have further questions, please contact us on our Discord server. This policy may be updated to reflect changes or legal requirements. In the event of a policy update, all users will be notified via the Discord client application on our server.
						</p>
					</div>
				</section>
			</div>
		</div>
		<div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<Footer />
			</div>
		</div>
	</div>
);

export default PrivacyPolicy;
