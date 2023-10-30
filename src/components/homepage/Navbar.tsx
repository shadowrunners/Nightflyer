'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Navbar() {
	const translation = useTranslations('main');
	const Router = useRouter();
	const [toggle, setToggle] = useState(false);
	const { data: session, status } = useSession();

	return (
		<nav className="w-full flex py-6 justify-between items-center navbar relative z-10">
			<a href="/">
				<Image
					width={500}
					height={200}
					priority={true}
					src="https://res.cloudinary.com/shadowrunners/image/upload/v1687690764/evl_logo.webp"
					alt="evelyn"
					className="w-[128px] h-[128px] object-contain" />
			</a>
			<ul className="list-none sm:flex hidden justify-end flex-1">
				<li className={'font-poppins font-normal cursor-pointer text-16 text-white'}>
					<motion.a className="mr-5" href={'#home'}>
						{translation('nav_home')}
					</motion.a>
				</li>
				<li className={'font-poppins font-normal cursor-pointer text-16 text-white'}>
					<motion.a className="mr-5" href={'#features'}>
            Features
					</motion.a>
				</li>
				<li className={'font-poppins font-normal cursor-pointer text-16 text-white'}>
					<motion.a href={'#developers'}>
            Developers
					</motion.a>
				</li>
			</ul>
			<div className="list-none hidden sm:block ml-5">
				<Button
					onClick={() => {
						if (!session) return Router.replace('/auth/login');
						else return Router.replace('/home');
					}}
					variant='outline'
					className='text-white button-glow'
				>
					{status === 'unauthenticated' ? 'Sign in with Discord' : 'Dashboard' }
				</Button>
			</div>

			<div className="sm:hidden flex flex-1 justify-end items-center">
				<Image
					height={20}
					width={12}
					src="https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evelyn/menu.svg"
					alt="menu"
					className="w-[28px] h-[28px] object-contain"
					onClick={() => setToggle((prev) => !prev)} />

				<div
					className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 max-4 my-2 min-w-[140px] rounded-xl sidebar`}
				>
					<ul className="list-none flex flex-col justify-end items-center flex-1">
						<li
							key='home_nav2'
							className={'font-poppins font-normal cursor-pointer text-16 text-white'}
						>
							<motion.a href={'#home'}>
                Home
							</motion.a>
						</li>
						<li
							key='features_nav2'
							className={'font-poppins font-normal cursor-pointer text-16 text-white mt-2 mb-2'}
						>
							<motion.a href={'#features'}>
                Features
							</motion.a>
						</li>
						<li
							key='devs_nav2'
							className={'font-poppins font-normal cursor-pointer text-16 text-white'}
						>
							<motion.a href={'#developers'}>
                Developers
							</motion.a>
						</li>
						<li
							className="font-poppins text-white font-normal cursor-pointer text-16 mr-0 mt-3 button-glow"
							onClick={() => {
								if (!session) return Router.replace('/auth/login');
								else return Router.replace('/home');
							}}
						>
							{status === 'unauthenticated' ? 'Sign in with Discord' : 'Dashboard' }
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
