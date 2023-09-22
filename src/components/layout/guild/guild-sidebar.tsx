import { Params } from '@/app/[locale]/dash/guilds/[guild]/features/[feature]/page';
import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { SidebarItem } from '../sidebar/SidebarItem';
import { Button, Separator } from '@/components/ui';
import { useGuildPreview } from '@/api/hooks';
import { getFeatures } from '@/utils/common';
import { useRouter } from 'next/router';

export function InGuildSidebar() {
	const router = useRouter();
	const { guild: guildId, feature: activeId } = router.query as Params;
	const { guild } = useGuildPreview(guildId);

	return (
		<div className='flex flex-col gap-2 p-3 text-white'>
			<a className='flex items-center cursor-pointer mb-2' href={`/dash/guilds/${guildId}`}>
				<Button className='hidden xl:block card-background rounded-2xl'>
					<ChevronLeftIcon className='align-middle' />
				</Button>
				<h1 className='font-semibold ml-2'>
					{guild?.name}
				</h1>
			</a>
			<div className='flex stretch gap-2.5 flex-col mb-2'>
				<h1 className='flex font-poppins font-semibold mx-auto'>Features</h1>
				<Separator className='mb-2' />

				{getFeatures().map((feature) => (
					<SidebarItem
						key={feature.id}
						name={feature.name}
						icon={feature.icon}
						active={activeId === feature.id}
						href={`/dash/guilds/${guildId}/features/${feature.id}`}
					/>
				))}
			</div>
		</div>
	);
}
