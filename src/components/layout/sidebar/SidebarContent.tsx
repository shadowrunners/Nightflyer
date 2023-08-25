import {
	Avatar,
	Box,
	Card,
	CardBody,
	Flex,
	HStack,
	IconButton,
	Spacer,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { SearchBar } from '@/components/forms/SearchBar';
import { useCallback, useMemo, useState, ChangeEvent } from 'react';
import { config } from '@/config/common';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { Guild, avatarUrl } from '@/api/discord';
import { GuildItem, GuildItemsSkeleton } from './GuildItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SidebarItem } from './SidebarItem';
import items from '@/config/sidebar-items';
import Image from 'next/image';

export function SidebarContent() {
	const [filter, setFilter] = useState('');
	const guilds = useGuilds();
	const { guild: selectedGroup } = useRouter().query as { guild: string };

	const filterGuilds = (guildsData: Guild[] | undefined) => {
		return guildsData?.filter((guild) => {
			const contains = guild.name.toLowerCase().includes(filter.toLowerCase());
			return config.guild.filter(guild) && contains;
		});
	};

	const filteredGuilds = useMemo(() => filterGuilds(guilds?.data), [guilds?.data, filter]);
	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	}, []);

	return (
		<>
			<VStack align="center" py="2rem" m={3} rounded="xl">
				<Image alt='logo' src='https://i.imgur.com/pahJQQm.png' width={200} height={200} />
			</VStack>

			<Stack direction="column" mb="auto">
				<Items />
				<Box px="10px">
					<SearchBar
						w="full"
						input={{
							value: filter,
							onChange: handleSearchChange,
						}}
					/>
				</Box>
				<Flex direction="column" px="10px" gap={3}>
					{filteredGuilds == null ? (
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
				</Flex>
			</Stack>
		</>
	);
}

export function BottomCard() {
	const user = useSelfUserQuery().data;

	if (user === null) return <></>;

	return (
		<Card pos="sticky" left={0} bottom={0} w="full" py={2}>
			<CardBody as={HStack}>
				<Avatar src={avatarUrl(user)} name={user?.username} size="sm" />
				<Text fontWeight="600">{user?.username}</Text>
				<Spacer />
				<Link href="/dash/user/profile">
					<IconButton icon={<SettingsIcon />} aria-label="settings" />
				</Link>
			</CardBody>
		</Card>
	);
}

function Items() {
	const active = useActiveSidebarItem();
	const filteredItems = useMemo(() => items.filter((item) => !item.hidden), []);

	return (
		<Flex direction="column" px="10px" gap={0}>
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
		</Flex>
	);
}
