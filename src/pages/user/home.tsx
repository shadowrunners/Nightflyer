import {
  Button,
  Card,
  CardHeader,
  Avatar,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Heading
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { useGuilds } from '@/api/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { iconUrl } from '@/api/discord';
import Link from 'next/link';
import { dashboard } from '@/config/translations/dashboard';

const HomePage: NextPageWithLayout = () => {
  const t = dashboard.useTranslations();

  return (
    <Flex direction="column" gap={5} ml={5} justify={'center'}>
      <Flex direction="column" gap={1} mt={3} >
        <Heading size="lg">{t.servers.title}</Heading>
        <Text color="TextSecondary" size={'12'}>{t.servers.description}</Text>
      </Flex>
      <GuildSelect />
    </Flex>
  );
};

export function GuildSelect() {
  const guilds = useGuilds();

  switch (guilds.status) {
    case 'success':
      return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
          {guilds.data
            ?.filter((guild) => config.guild.filter(guild))
            .map((guild) => (
              <Card key={guild.id} variant="primary" as={Link} href={`/guilds/${guild.id}`}>
                <CardHeader as={Flex} flexDirection="row" gap={3}>
                  <Avatar src={iconUrl(guild)} name={guild.name} size="md" />
                  <Text>{guild.name}</Text>
                </CardHeader>
              </Card>
            ))}
        </SimpleGrid>
      );
    case 'error':
      return (
        <Button w="fit-content" variant="danger" onClick={() => guilds.refetch()}>
          Try Again
        </Button>
      );
    case 'loading':
      return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
          <Skeleton minH="88px" rounded="2xl" />
          <Skeleton minH="88px" rounded="2xl" />
          <Skeleton minH="88px" rounded="2xl" />
          <Skeleton minH="88px" rounded="2xl" />
          <Skeleton minH="88px" rounded="2xl" />
        </SimpleGrid>
      );
  }
}

HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
