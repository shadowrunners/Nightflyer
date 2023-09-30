'use client';

import { Card, CardContent, CardFooter, Button } from '@/components/ui';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { QueryStatus } from '@/components/panel/QueryPanel';
import { config } from '@/config/common';
import { useTranslations } from 'next-intl';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { useGuildInfoQuery } from '@/api/hooks';
import { useRouter } from 'next/navigation';
import { getFeatures } from '@/utils/common';
import { Banner } from '@/components/GuildBanner';
import type { CustomGuildInfo } from '@/config/types/custom-types';

const GuildPage = ({ params }: { params: { guild: string }}) => {
	const guild = params.guild;
	const t = useTranslations('error');
	const query = useGuildInfoQuery(guild);

	return (
		<QueryStatus query={query} loading={<LoadingPanel />} error={t('load')}>
			{query?.data?.id != null ? (
				<GuildPanel guild={guild} data={query.data} />
			) : (<NotJoined guild={guild} />)}
		</QueryStatus>
	);
};

function GuildPanel({ guild: id, data }: { guild: string; data: CustomGuildInfo }) {
	const Router = useRouter();
	const t = useTranslations();

	return (
		<div className='flex flex-col gap-5 text-white'>
			<Banner />
			<div className='flex flex-col gap-5 mt-3'>
				<h1 className='text-[23px] font-poppins font-semibold'>{t('features')}</h1>
				<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-3">
					{getFeatures().map((feature) => (
						<Card className='black2 text-white'>
							<CardContent className='flex flex-gap gap-3 mt-5'>
								<div className={'flex rounded-xl w-[50px] h-[50px] text-3xl card-background justify-center items-center'}>
									{feature.icon}
								</div>
								<div className="flex-1">
									<p className="font-semibold text-base md:text-lg">
										{feature.name}
									</p>
									<p className="text-sm md:text-md text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant='outline'
									className='rounded-2xl bg-white text-black font-poppins font-semibold transition-transform hover:scale-105 hover:shadow-lg'
									onClick={() => Router.push(`/guilds/${id}/features/${feature.id}`)}
								>
									{data?.enabledFeatures?.includes(feature.id) ? 'Configure' : 'Enable'}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

function NotJoined({ guild }: { guild: string }) {
	const t = useTranslations('dash');
	const Router = useRouter();

	return (
		<div className='flex justify-center items-center flex-col gap-3 h-full p-5'>
			<BiSolidErrorAlt className='w-[50px] h-[50px]' />
			<h1 className='text-xl font-semibold'>
				{t('not_found')}
			</h1>
			<h1 className='text-center text-dimWhite'>
				{t('not_found_desc')}
			</h1>
			<Button
				variant='outline'
				className='px-6'
				onClick={() => Router.push(`${config.inviteUrl}&guild_id=${guild}`)}
			>
				<FaRobot className='mr-2' />
				{t('button.invite')}
			</Button>
		</div>
	);
}

export default GuildPage;