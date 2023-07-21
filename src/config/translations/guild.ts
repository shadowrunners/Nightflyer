import { provider } from './provider';
import { createI18n } from '@/utils/i18n';

export const guild = createI18n(provider, {
  en: {
    features: 'Features',
    banner: {
      title: 'Welcome back, runner.',
      description: 'What would you like to customize?',
    },
    error: {
      'not found': 'System failure',
      'not found description': "Uh oh, Evelyn couldn't access this cyberspace as she isn't a member of it.",
      load: 'Failed to load this cyberspace. Perhaps the backend has gone haywire?',
    },
    bn: {
      'enable feature': 'Enable',
      'config feature': 'Config',
      invite: 'Invite Evelyn',
    },
  },
  cn: {
    features: '管理機器人功能',
    banner: {
      title: '立即免費試用',
      description: '為您的服務器定制機器人',
    },
    error: {
      'not found': '它在哪裡？',
      'not found description': '機器人無法訪問服務器，我們邀請他吧！',
      load: '無法加載服務器',
    },
    bn: {
      'enable feature': '啟用功能',
      'config feature': '配置',
      invite: '邀請機器人',
    },
  },
});
