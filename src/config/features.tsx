import { Icon } from '@chakra-ui/react';
import { FaGamepad } from 'react-icons/fa';
import { IoHappy } from 'react-icons/io5';
import { MdAddReaction, MdMessage } from 'react-icons/md';
import { GiTalk } from 'react-icons/gi'
import { FeaturesConfig } from './types';
import { provider } from '@/config/translations/provider';
import { createI18n } from '@/utils/i18n';
import { useWelcomeFeature } from '../pages/guilds/[guild]/features/WelcomeSystem';
import { useAntiPhishFeature } from '@/pages/guilds/[guild]/features/AntiPhishSystem';
import { useConfessionSystem } from '@/pages/guilds/[guild]/features/ConfessionsSystem';
import { useLevellingSystem } from '@/pages/guilds/[guild]/features/LevelSystem';
import { useGoodbyeSystem } from '@/pages/guilds/[guild]/features/GoodbyeSystem';
import { useLogsSystem } from '@/pages/guilds/[guild]/features/LogsSystem';
import { useTicketSystem } from '@/pages/guilds/[guild]/features/TicketSystem';
import { useVerifySystem } from '@/pages/guilds/[guild]/features/VerifySystem';

/**
 * Support i18n (Localization)
 */
const { T } = createI18n(provider, {
  en: {
    music: 'Music Player',
    'music description': 'Play music in Your Discord Server',
    gaming: 'Gaming',
  },
  cn: {
    music: '音樂播放器',
    'music description': '在您的 Discord 服務器中播放音樂',
    gaming: '遊戲',
  },
});

/** This where the information for every feature is. */
export const features: FeaturesConfig = {
  antiphishing: {
    name: 'Anti-Phishing System',
    description: 'Protects your server against scammers.',
    icon: <Icon as={GiTalk} />,
    useRender: useAntiPhishFeature,
  },
  confessions: {
    name: 'Confessions',
    description: 'Sends an anonymous message to a designated channel.',
    icon: <Icon as={GiTalk} />,
    useRender: useConfessionSystem,
  },
  goodbye: {
    name: 'Goodbye System',
    description: 'Sends a custom message when a user joins the server.',
    icon: <Icon as={MdMessage} />,
    useRender: useGoodbyeSystem,
  },
  logs: {
    name: 'Logs',
    description: 'Logs every single moderation action / server change to a designated channel.',
    icon: <Icon as={GiTalk} />,
    useRender: useLogsSystem,
  },
  levelling: {
    name: 'Levelling',
    description: 'Makes chatting more rewarding by introducing an XP system.',
    icon: <Icon as={GiTalk} />,
    useRender: useLevellingSystem,
  },
  tickets: {
    name: 'Tickets',
    description: 'Makes chatting more rewarding by introducing an XP system.',
    icon: <Icon as={GiTalk} />,
    useRender: useTicketSystem,
  },
  verification: {
    name: 'Verification',
    description: 'Sends a custom message when a user joins the server',
    icon: <Icon as={MdMessage} />,
    useRender: useVerifySystem,
  },
  welcome: {
    name: 'Welcome System',
    description: 'Sends a custom message when a user joins the server',
    icon: <Icon as={MdMessage} />,
    useRender: useWelcomeFeature,
  },
};
