import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { IoMdMoon, IoMdSunny, IoMdLogOut } from 'react-icons/io';
import { GuildItem, GuildItemsSkeleton } from './GuildItem';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarItem } from './SidebarItem';
import type { Guild } from '@/types/types';
import items from '@/config/sidebar-items';
import { avatarUrl } from '@/api/discord';
import { Fragment, useMemo, useState } from 'react';
import { config } from '@/config/common';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export function SidebarContent() {
	const [filter] = useState('');
	const guilds = useGuilds();
	const { guild: selectedGroup } = useRouter().query as { guild: string };

	const filterGuilds = (guildsData: Guild[] | undefined) => {
		return guildsData?.filter((guild) => {
			const contains = guild.name.toLowerCase().includes(filter.toLowerCase());
			return config.guild.filter(guild) && contains;
		});
	};

	const filteredGuilds = useMemo(() => filterGuilds(guilds?.data), [guilds?.data, filter]);

	return (
		<Fragment>
			<section className='flex flex-col gap-16 py-2 m-3 rounded-xl p-10 mt-5 mb-5'>
				<Image alt='logo' src='https://i.imgur.com/pahJQQm.png' width={200} height={200} />
			</section>

			<div className='flex flex-col mb-auto'>
				<Items />

				<div className='flex flex-col px-[10px] gap-3'>
					{filteredGuilds === null ? (
						<GuildItemsSkeleton />
					) : (
						filteredGuilds?.map((guild) => (
							<GuildItem
								key={guild.id}
								guild={guild}
								active={selectedGroup === guild.id}
								href={`/guilds/${guild.id}`}
							/>
						))
					)}
				</div>
			</div>
		</Fragment>
	);
}

export function BottomCard() {
	const user = useSelfUserQuery().data;
	const [colorMode, toggleColorMode] = useState();

	if (user == null) return <></>;

	return (
		<Card className='sticky left-0 bottom-0 w-full py-2 bg-transparent'>
			<CardContent className='flex'>
				<Avatar className='mr-3'>
					<AvatarImage src={avatarUrl(user)} alt='pfp' />
					<AvatarFallback>{user?.username}</AvatarFallback>
				</Avatar>
				<h3 className='font-semibold text-white mt-1'>{user?.username}</h3>

				<div className='flex-1 self-stretch' />

				<Button variant='outline' size='icon' className='mr-2'>
					{colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
				</Button>
				<Button variant='outline' size='icon' onClick={() => signOut()}>
					<IoMdLogOut className='accent-white' />
				</Button>
			</CardContent>
		</Card>
	);
}

function Items() {
	const active = useActiveSidebarItem();
	const filteredItems = useMemo(() => items.filter((item) => !item.hidden), []);

	return (
		<div className='flex flex-col px-3 gap-0 mb-3'>
			{filteredItems
				.map((route: SidebarItemInfo, index: number) => (
					<SidebarItem
						key={index}
						href={route.path}
						name={route.name}
						icon={route.icon}
						active={active === route}
					/>
				))}
		</div>
	);
}