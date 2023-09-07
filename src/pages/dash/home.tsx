import { config } from '@/config/common';
import { useGuilds } from '@/api/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { iconUrl } from '@/api/discord';
import { dashboard } from '@/config/translations/dashboard';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HomePage: NextPageWithLayout = () => {
	const t = dashboard.useTranslations();

	return (
		<div className='flex flex-col gap-5 ml-5 justify-center'>
			<div className='flex flex-col gap-1 mt-3'>
				<h2 className='text-2xl text-semibold font-poppins'>{t.servers.title}</h2>
				<h1 className='text-dimWhite text-sm'>{t.servers.description}</h1>
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
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
				{data
					?.filter((guild) => config.guild.filter(guild))
					.map((guild) => (
						<Card key={guild.id} className='black2 font-oppins font-semibold' >
							<a href={`/guilds/${guild.id}`}>
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

HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
