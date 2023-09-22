'use client';

import { Avatar, AvatarImage, AvatarFallback, Card, CardContent, Skeleton } from '@/components/ui';
import { iconUrl } from '@/api/discord';
import { Guild } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export function GuildItem({
	guild,
	active,
	href,
}: {
  guild: Guild;
  active: boolean;
  href: string;
}) {
	const Router = useRouter();
	return (
		<Card
			className={`${ active ? 'card-background-selected text-black' : 'card-background text-white' } cursor-pointer rounded-xl`}
			onClick={() => Router.replace(href)}
		>
			<CardContent className='flex flex-col gap-0'>
				<Avatar className='mt-3.5'>
					<AvatarImage src={iconUrl(guild)} />
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
