import { Flex, Heading, Text } from '@chakra-ui/layout';
import { guild as view } from '@/config/translations/guild';

export function Banner() {
  const t = view.useTranslations();

  return (
    <Flex
      direction="column"
      px={{ base: 5, lg: 8 }}
      py={{ base: 5, lg: 7 }}
      rounded="2xl"
      bgColor="Brand"
      bgSize="cover"
      gap={1}
    >
      <Heading color="white" fontSize={{ base: '2xl' }} fontWeight="bold">
        {t.banner.title}
      </Heading>
      <Text color="whiteAlpha.800">{t.banner.description}</Text>
    </Flex>
  );
}
