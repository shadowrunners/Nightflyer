import { Icon } from '@chakra-ui/react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { IoHappy } from 'react-icons/io5';
import { MdAddReaction, MdMessage } from 'react-icons/md';
import { GiTalk } from 'react-icons/gi'
import { FeaturesConfig } from './types';
import { provider } from '@/config/translations/provider';
import { createI18n } from '@/utils/i18n';
import { useWelcomeFeature } from '../pages/guilds/[guild]/features/WelcomeSystem';
import { useMemeFeature } from './example/MemeFeature';
import { useAntiPhishFeature } from '@/pages/guilds/[guild]/features/AntiPhishSystem';
import { useConfessionSystem } from '@/pages/guilds/[guild]/features/ConfessionsSystem';

/**
 * Support i18n (Localization)
 */
const { T } = createI18n(provider, {
  en: {
    music: 'Music Player',
    'music description': 'Play music in Your Discord Server',
    gaming: 'Gaming',
    'gaming description': 'Enjoy playing games with your friends',
    'reaction role': 'Reaction Role',
    'reaction role description': 'Give user a role when clicking on a button',
    memes: 'Memes Time',
    'memes description': 'Send memes everyday',
  },
  cn: {
    music: '音樂播放器',
    'music description': '在您的 Discord 服務器中播放音樂',
    gaming: '遊戲',
    'gaming description': 'Enjoy playing games with your friends',
    'reaction role': '反應角色',
    'reaction role description': '單擊按鈕時為用戶賦予角色',
    memes: '模因時間',
    'memes description': '每天發送模因',
  },
});

/**
 * Define information for each features
 *
 * There is an example:
 */
export const features: FeaturesConfig = {
  music: {
    name: <T text="music" />,
    description: <T text="music description" />,
    icon: <Icon as={BsMusicNoteBeamed} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  'antiphishing': {
    name: 'Anti-Phishing System',
    description: 'Protects your server against scammers.',
    icon: <Icon as={GiTalk} />,
    useRender: useAntiPhishFeature,
  },
  'confessions': {
    name: 'Confessions',
    description: 'Sends an anonymous message to a designated channel.',
    icon: <Icon as={GiTalk} />,
    useRender: useConfessionSystem,
  },
  'welcome': {
    name: 'Welcome System',
    description: 'Sends a custom message when a user joins the server',
    icon: <Icon as={MdMessage} />,
    useRender: useWelcomeFeature,
  },
  gaming: {
    name: <T text="gaming" />,
    description: <T text="gaming description" />,
    icon: <Icon as={FaGamepad} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  'reaction-role': {
    name: <T text="reaction role" />,
    description: <T text="reaction role description" />,
    icon: <Icon as={MdAddReaction} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  meme: {
    name: <T text="memes" />,
    description: <T text="memes description" />,
    icon: <Icon as={IoHappy} />,
    useRender: useMemeFeature,
  },
};
