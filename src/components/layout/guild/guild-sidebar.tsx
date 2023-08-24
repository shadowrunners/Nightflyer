import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { HSeparator } from '@/components/layout/Separator';
import { sidebarBreakpoint } from '@/theme/breakpoints';
import { Icon, IconButton } from '@chakra-ui/react';
import { SidebarItem } from '../sidebar/SidebarItem';
import { useGuildPreview } from '@/api/hooks';
import { getFeatures } from '@/utils/common';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function InGuildSidebar() {
	const router = useRouter();
	const { guild: guildId, feature: activeId } = router.query as Params;
	const { guild } = useGuildPreview(guildId);

	return (
		<Flex direction="column" gap={2} p={3}>
			<HStack as={Link} cursor="pointer" mb={2} href={`/guilds/${guildId}`}>
				<IconButton
					display={{ base: 'none', [sidebarBreakpoint]: 'block' }}
					icon={<Icon verticalAlign="middle" as={ChevronLeftIcon} />}
					aria-label="back"
				/>
				<Text fontSize="lg" fontWeight="600">
					{guild?.name}
				</Text>
			</HStack>
			<VStack align="stretch">
				<HSeparator>Features</HSeparator>
				{getFeatures().map((feature) => (
					<SidebarItem
						key={feature.id}
						name={feature.name}
						icon={feature.icon}
						active={activeId === feature.id}
						href={`/guilds/${guildId}/features/${feature.id}`}
					/>
				))}
			</VStack>
		</Flex>
	);
}
