import { provider } from './provider';
import { createI18n } from '@/utils/i18n';

export const dashboard = createI18n(provider, {
	en: {
		pricing: 'Pricing',
		learn_more: 'Learn More',
		servers: {
			title: 'Your journey starts here',
			description: 'Select a server to continue your journey.',
		},
		vc: {
			create: 'Create a voice channel',
			'created channels': 'Created Voice channels',
		},
		command: {
			title: 'Command Usage',
			description: 'Use of commands of your server',
		},
	},
	cn: {
		pricing: '價錢',
		learn_more: '了解更多',
		servers: {
			title: '選擇服務器',
			description: '自定義您的服務器',
		},
		vc: {
			create: '創建語音通道',
			'created channels': '已創建語音頻道',
		},
		command: {
			title: '命令使用量',
			description: '使用你的服務器命令使用量',
		},
	},
});
