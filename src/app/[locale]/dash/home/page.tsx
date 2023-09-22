'use client';

import { Avatar, AvatarImage, AvatarFallback, Button, Card, CardHeader, Skeleton } from '@/components/ui';
import AppLayout from '@/app/[locale]/dash/layout';
import { useTranslations } from 'next-intl';
import { config } from '@/config/common';
import { useGuilds } from '@/api/hooks';
import { iconUrl } from '@/api/discord';
import { ReactNode } from 'react';

const HomePage = () => {
	const t = useTranslations('dash');

	return (
		<div className='flex flex-col gap-5 ml-5 justify-center text-white'>
			<div className='flex flex-col gap-1 mt-3'>
				<h2 className='text-2xl text-semibold font-poppins'>{t('servers.title')}</h2>
				<h1 className='text-dimWhite text-sm'>{t('servers.description')}</h1>
			</div>
			<GuildSelect />
		</div>
	);
};

export function GuildSelect() {
	const { status, data, refetch } = useGuilds();

	switch (status) {
	case 'success':
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-white">
				{data
					?.filter((guild) => config.guild.filter(guild))
					.map((guild) => (
						<Card key={guild.id} className='black2 font-oppins font-semibold' >
							<a href={`/dash/guilds/${guild.id}`}>
								<CardHeader className='flex flex-row gap-3'>
									<Avatar>
										<AvatarImage src={iconUrl(guild)} />
										<AvatarFallback>SW</AvatarFallback>
									</Avatar>
									<h1>{guild.name}</h1>
								</CardHeader>
							</a>
						</Card>
					))}
			</div>
		);
	case 'error':
		return (
			<Button className='w-fit' variant="destructive" onClick={() => refetch()}>
				Try Again
			</Button>
		);
	case 'loading':
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
				<Skeleton className='min-h-[88px] rounded-2xl' />
				<Skeleton className='min-h-[88px] rounded-2xl' />
				<Skeleton className='min-h-[88px] rounded-2xl' />
				<Skeleton className='min-h-[88px] rounded-2xl' />
				<Skeleton className='min-h-[88px] rounded-2xl' />
			</div>
		);
	}
}

HomePage.getLayout = (c: ReactNode) => <AppLayout>{c}</AppLayout>;
export default HomePage;
