'use client';

import { RxHamburgerMenu } from 'react-icons/rx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui';
import { useState } from 'react';
import Image from 'next/image';

const font = Poppins({
	weight: '400',
	subsets: ['latin', 'latin-ext'],
});

export default function Navbar() {
	const translation = useTranslations('main');
	const translation2 = useTranslations('auth');
	const Router = useRouter();
	const [toggle, setToggle] = useState(false);
	const { data: session, status } = useSession();

	return (
		<nav className={`${font.className} w-full flex py-6 justify-between items-center navbar relative z-10 text-white`}>
			<a href="/">
				<Image
					width={500}
					height={200}
					src="./logo.webp"
					alt="evelyn"
					className="w-[128px] h-[128px] object-contain"
				/>
			</a>
			<ul className="list-none sm:flex hidden justify-end flex-1">
				<li className='cursor-pointer text-16'>
					<a className="mr-5" href={'#home'}>
						{translation('nav_home')}
					</a>
				</li>
				<li className='cursor-pointer text-16'>
					<a className="mr-5" href={'#features'}>
						{translation('nav_features')}
					</a>
				</li>
				<li className='cursor-pointer text-16'>
					<a href={'#developers'}>
						{translation('nav_devs')}
					</a>
				</li>
			</ul>
			<div className="list-none hidden sm:block ml-5">
				<Button
					onClick={() => {
						if (!session) return Router.replace('/auth/login');
						else return Router.replace('/home');
					}}
					variant='outline'
					className='button-glow'
				>
					{status === 'unauthenticated' ? translation2('login_btn') : translation('nav_dash_btn') }
				</Button>
			</div>

			<div className="sm:hidden flex flex-1 justify-end items-center">
				<RxHamburgerMenu
					className="w-[28px] h-[28px]"
					onClick={() => setToggle((prev) => !prev)}
				/>
				<div
					className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 max-4 my-2 min-w-[140px] rounded-xl sidebar`}
				>
					<ul className="list-none flex flex-col justify-end items-center flex-1">
						<li
							key='home_nav2'
							className='cursor-pointer text-16'
						>
							<a href='#home'>
								{translation('nav_home')}
							</a>
						</li>
						<li
							key='features_nav2'
							className='cursor-pointer text-16 mt-2 mb-2'
						>
							<a href='#features'>
								{translation('nav_features')}
							</a>
						</li>
						<li
							key='devs_nav2'
							className='cursor-pointer text-16'
						>
							<a href='#developers'>
								{translation('nav_devs')}
							</a>
						</li>
						<li
							className="cursor-pointer text-16 mr-0 mt-3"
							onClick={() => {
								if (!session) return Router.replace('/auth/login');
								else return Router.replace('/home');
							}}
						>
							{status === 'unauthenticated' ? translation2('login_btn') : translation('nav_dash_btn') }
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
