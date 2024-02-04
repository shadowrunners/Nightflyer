'use client';

import { Avatar, AvatarImage, AvatarFallback, Card, CardHeader, Button, Skeleton } from './';
import { getGuildImg } from '@/utils/API/fetch';
import { filterGuilds } from '@Utils';
import { useGuilds } from '@Hooks';

export function GuildSelect() {
	const { status, data, refetch } = useGuilds();
	const filteredGuilds = data?.filter((guild) => filterGuilds(guild));

	switch (status) {
	case 'success':
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-white">
				{filteredGuilds?.map((guild) => (
					<Card key={guild.id} className='bg-secondary font-poppins font-semibold border hover:bg-black'>
						<a href={`/guilds/${guild.id}`}>
							<CardHeader className='flex flex-row gap-3'>
								<Avatar>
									<AvatarImage src={getGuildImg(guild.id, guild.icon)}/>
									<AvatarFallback className='text-black'>SW</AvatarFallback>
								</Avatar>
								<h1>{guild.name}</h1>
							</CardHeader>
						</a>
					</Card>
				))}
			</div>
		);
	case 'pending':
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-white mt-2">
				<Skeleton className="w-[100px] h-[20px] rounded-full" />
				<Skeleton className="w-[100px] h-[20px] rounded-full" />
				<Skeleton className="w-[100px] h-[20px] rounded-full" />
			</div>
		);
	case 'error':
		return (
			<Button className='w-fit' variant="destructive" onClick={() => refetch()}>
					Try Again
			</Button>
		);
	}
}