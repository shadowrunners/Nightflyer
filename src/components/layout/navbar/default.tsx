import { common } from '@/config/translations/common';
import { useActiveSidebarItem } from '@/utils/router';
import { SkeletonText } from '@chakra-ui/react';
import { IoHome } from 'react-icons/io5';
import { ReactNode } from 'react';

export function DefaultNavbar() {
	const activeItem = useActiveSidebarItem();
	const breadcrumb = [
		{
			icon: (<IoHome />) as ReactNode,
			text: (<common.T text="pages" />) as ReactNode,
			href: '/dash/home',
		},
	];

	if (activeItem !== null)
		breadcrumb.push({
			icon: activeItem.icon,
			text: <>{activeItem.name}</>,
			href: activeItem.path,
		});

	return (
		<div className='gap-3 mt-0'>
			<nav className='font-semibold flex justify-between navbar'>
				<ol className='flex items-center'>
					{breadcrumb.map((item, i) => (
						<li key={i} className='inline-flex items-center'>
							<a className='inline-flex items-center w-[100%] gap-1 rounded-full card-background p-1.5' href={item.href}>
								{item.icon} <span>{item.text}</span>
							</a>

							{i < breadcrumb.length - 1 && (
								<span className='ms-2 me-2'>
               					 	<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  						<path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" />
                					</svg>
              					</span>
							)}
						</li>
					))}
				</ol>
			</nav>

			<p className='font-bold text-base sm:text-3xl mb-2'>
				{activeItem?.name ?? <SkeletonText w="full" noOfLines={2} />}
			</p>
		</div>
	);
}
