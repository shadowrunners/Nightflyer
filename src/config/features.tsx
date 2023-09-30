import { MdMessage } from 'react-icons/md';
import { GiTalk } from 'react-icons/gi';
import { FeaturesConfig } from './types';
import { useWelcomeFeature } from '../features/WelcomeSystem';
import { useAntiPhishFeature } from '../features/AntiPhishSystem';
import { useConfessionSystem } from '../features/ConfessionsSystem';
import { useLevellingSystem } from '../features/LevelSystem';
import { useGoodbyeSystem } from '../features/GoodbyeSystem';
import { useLogsSystem } from '../features/LogsSystem';
import { useTicketSystem } from '../features/TicketSystem';
import { useVerifySystem } from '../features/VerifySystem';

/** This is where the information for every feature is. */
export const features: FeaturesConfig = {
	antiphishing: {
		name: 'Anti-Phishing',
		description: 'Protects your server against scammers.',
		icon: <GiTalk />,
		useRender: useAntiPhishFeature,
	},
	confessions: {
		name: 'Confessions',
		description: 'Sends an anonymous message to a designated channel.',
		icon: <GiTalk />,
		useRender: useConfessionSystem,
	},
	goodbye: {
		name: 'Goodbye',
		description: 'Sends a custom message when a user joins the server.',
		icon: <MdMessage />,
		useRender: useGoodbyeSystem,
	},
	logs: {
		name: 'Logs',
		description: 'Logs every single mod(s) action / server change to a designated channel.',
		icon: <GiTalk />,
		useRender: useLogsSystem,
	},
	levelling: {
		name: 'Levelling',
		description: 'Makes chatting more rewarding by introducing an XP system.',
		icon: <GiTalk />,
		useRender: useLevellingSystem,
	},
	tickets: {
		name: 'Tickets',
		description: 'Makes chatting more rewarding by introducing an XP system.',
		icon: <GiTalk />,
		useRender: useTicketSystem,
	},
	verification: {
		name: 'Verification',
		description: 'Sends a custom message when a user joins the server',
		icon: <MdMessage />,
		useRender: useVerifySystem,
	},
	welcome: {
		name: 'Welcome',
		description: 'Sends a custom message when a user joins the server',
		icon: <MdMessage />,
		useRender: useWelcomeFeature,
	},
};
