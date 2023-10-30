'use client';

import { Avatar, AvatarImage, AvatarFallback, Card, CardContent, Skeleton } from '@/components/ui';
import { getGuildImg } from '@/utils/API/fetch';
import type { APIGuild } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export function GuildItem({
	guild,
	active,
	href,
}: {
  guild: APIGuild;
  active: boolean;
  href: string;
}) {
	const Router = useRouter();
	return (
		<Card
			className={`${ active ? 'card-background-selected text-black' : 'card-background text-white' } cursor-pointer rounded-xl`}
			onClick={() => Router.replace(href)}
		>
			<CardContent className='flex flex-col gap-0 p-5'>
				<Avatar>
					<AvatarImage src={getGuildImg(guild.id, guild.icon)} />
					<AvatarFallback className='bg-white text-black font-semibold'>SW</AvatarFallback>
				</Avatar>
				<h3 className='font-semibold'>{guild.name}</h3>
			</CardContent>
		</Card>
	);
}

export function GuildItemsSkeleton() {
	return (
		<Fragment>
			<Skeleton className='h-[124px] rounded-xl' />
			<Skeleton className='h-[124px] rounded-xl' />
			<Skeleton className='h-[124px] rounded-xl' />
			<Skeleton className='h-[124px] rounded-xl' />
			<Skeleton className='h-[124px] rounded-xl' />
		</Fragment>
	);
}
