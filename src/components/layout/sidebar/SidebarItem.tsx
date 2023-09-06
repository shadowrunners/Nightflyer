import { ReactNode } from 'react';
import Router from "next/router";

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
	return (
		<div
			className={`flex ${ active ? 'bg-white' : 'card-background' } rounded-xl p-2 text-${ active ? 'black' : 'bg-white' } cursor-pointer`}
			onClick={() => Router.replace(href)}
		>
			<div className='flex p-2 rounded mr-1'>
				{icon}
			</div>
			<h2 className='font-semibold mt-0.5'>{name}</h2>
		</div>
	);
}
