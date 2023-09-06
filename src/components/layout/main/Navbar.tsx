import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Router from 'next/router';
import Image from 'next/image';

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const { data: session, status } = useSession();

	return (
		<nav className="w-full flex py-6 justify-between items-center navbar relative z-10">
			<a href="/">
				<Image
					width={500}
					height={200}
					src="https://res.cloudinary.com/shadowrunners/image/upload/v1687690764/evl_logo.webp"
					alt="evelyn"
					className="w-[128px] h-[128px] object-contain" />
			</a>
			<ul className="list-none sm:flex hidden justify-end flex-1">
				<li className={'font-poppins font-normal cursor-pointer text-16 text-white'}>
					<motion.a className="mr-5" href={'#home'}>
            Home
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
						if (!session) return Router.replace('/auth/signin');
						else return Router.replace('/dash/home');
					}}
					variant='outline'
					className='text-white'


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
							className="font-poppins text-white font-normal cursor-pointer text-16 mr-0 mt-3"
							onClick={() => {
								if (!session) return Router.replace('/auth/signin');
								else return Router.replace('/dash/home');
							}}
						>
							{status === 'unauthenticated' ? 'Sign in with Discord' : 'Dashboard' }
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
