'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export function SidebarItem({
	name,
	active,
	icon,
	href,
}: {
  name: ReactNode;
  icon: ReactNode;
  active: boolean;
  href: string;
}) {
	const Router = useRouter();

	return (
		<div
			className={`flex ${ active ? 'bg-white' : 'card-background' } rounded-xl p-2 mb-1 text-${ active ? 'black' : 'bg-white' } cursor-pointer`}
			onClick={() => Router.replace(href)}
		>
			<div className='flex p-2 rounded mr-1'>
				{icon}
			</div>
			<span className='font-semibold mt-0.5'>{name}</span>
		</div>
	);
}
