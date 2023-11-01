import { useActiveSidebarItem } from '@/utils/router';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useTranslations } from 'next-intl';
import { IoHome } from 'react-icons/io5';
import { ReactNode } from 'react';

export function DefaultNavbar() {
	const activeItem = useActiveSidebarItem();
	const t = useTranslations('breadcrumbs');
	const breadcrumb = [
		{
			icon: (<IoHome />) as ReactNode,
			text: (<>{t('home')}</>) as ReactNode,
			href: '/home',
		},
	];

	if (activeItem !== null)
		breadcrumb.push({
			icon: activeItem.icon,
			text: <>{activeItem.name}</>,
			href: activeItem.path,
		});

	return (
		<div className='gap-3 mt-0 text-white'>
			<nav className='font-semibold flex justify-between navbar'>
				<ol className='flex items-center'>
					{breadcrumb.map((item, i) => (
						<li key={i} className='inline-flex items-center'>
							<a className='inline-flex items-center w-[100%] gap-1 rounded-full card-background p-1.5' href={item.href}>
								{item.icon} <span>{item.text}</span>
							</a>

							{i < breadcrumb.length - 1 && (<RxHamburgerMenu />)}
						</li>
					))}
				</ol>
			</nav>

			<div className='font-bold text-base sm:text-3xl mb-2'>
				{activeItem?.name}
			</div>
		</div>
	);
}
