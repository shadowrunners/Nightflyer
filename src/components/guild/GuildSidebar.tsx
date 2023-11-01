'use client';

import { useGuildPreview } from '@/utils/API/hooks';
import { SidebarItem } from '@/components/sidebar/SidebarItem';
import { Button, Separator } from '@/components/ui';
import { FaChevronLeft } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { getFeatures } from '@/utils/util';
import { useTranslations } from 'next-intl';

export function InGuildSidebar() {
	const t = useTranslations('dash');
	const path = usePathname().split('/');
	const guildId = path[3];
	const activeId = path[5];

	const { guild } = useGuildPreview(guildId);

	return (
		<div className='flex flex-col gap-2 p-3 text-white'>
			<a className='flex items-center cursor-pointer mb-2' href={`/guilds/${guildId}`}>
				<Button className='hidden xl:block card-background rounded-2xl'>
					<FaChevronLeft className='align-middle' />
				</Button>
				<h1 className='font-semibold ml-2 text-white'>
					{guild?.name}
				</h1>
			</a>
			<div className='flex stretch gap-2.5 flex-col mb-2'>
				<h1 className='flex font-poppins font-semibold mx-auto'>{t('features.name')}</h1>
				<Separator className='mb-2' />

				{getFeatures().map((feature) => (
					<SidebarItem
						key={feature.id}
						name={feature.name}
						icon={feature.icon}
						active={activeId === feature.id}
						href={`/guilds/${guildId}/features/${feature.id}`}
					/>
				))}
			</div>
		</div>
	);
}
