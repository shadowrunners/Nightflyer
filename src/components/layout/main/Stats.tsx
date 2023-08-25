import React, { useState, useEffect, useRef } from 'react';
import Counter from './Counter';
import { motion } from 'framer-motion';
// import { get } from 'superagent';
import { styles } from '@/utils/utils';

const Stats = () => {
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setInView(entry.isIntersecting);
		}, { threshold: 0.5 });
		if (ref.current) observer.observe(ref.current);
		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, []);

	// useEffect(() => {
	//    get('https://api.statcord.com/v3/832289090128969787')
	//        .then(response => {
	//            const json = JSON.parse(response.text);
	//                setServerData(json.data[0]);
	//        })
	//        .catch(error => {
	//            console.error(error);
	//        });
	// }, []);

	return (
		<section id="section" className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
			<div className="flex justify-center items-center w-full mb-6 flex-col sm:flex-row">
				<motion.h4
					ref={ref}
					initial={{ opacity: 0 }}
					animate={{ opacity: inView ? 1 : 0 }}
					transition={{ delay: 0.6 }}
					className={'font-poppins font-semibold xs:text-[40px] text-[30px] text-white xs:leading-[53px] leading-[43px] sm:ml-5 text-center'}
				>
            We're currently serving
				</motion.h4>

				<div className="flex justify-start items-center m-3">
					<motion.h4
						ref={ref}
						className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] text-gradient leading-[43px] text-white"
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: 1.0 }}
					>
						<Counter value={32} />
					</motion.h4>

					<motion.h4
						ref={ref}
						className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] text-gradient leading-[43px] text-white"
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: 1.0 }}
					>
						<p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-2">
              Servers
						</p>
					</motion.h4>
				</div>

				<div className="flex justify-start items-center ml-3 mr-2">
					<motion.h4
						ref={ref}
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: 1.0 }}
						className={'font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'}
					>
              and
					</motion.h4>
				</div>

				<div className="flex justify-start items-center m-3 sm:flex">
					<motion.h4
						ref={ref}
						className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] text-gradient leading-[43px] text-white"
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: 1.0 }}
					>
						<Counter value={1802} />
					</motion.h4>

					<motion.h4
						ref={ref}
						className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] text-gradient leading-[43px] text-white"
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: 1.0 }}
					>
						<p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-2">
              Users
						</p>
					</motion.h4>
				</div>
			</div>
		</section>
	);
};

export default Stats;