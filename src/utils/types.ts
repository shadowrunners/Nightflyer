import {
	WelcomeFeature,
	AntiPhishingFeature,
	ConfessionsFeature,
	GoodbyeFeature,
	LogsFeature,
	LevellingFeature,
	TicketsFeature,
	VerifyFeature,
} from '@/config/types';

export type Features =
	WelcomeFeature |
	AntiPhishingFeature |
	ConfessionsFeature |
	GoodbyeFeature |
	LogsFeature |
	LevellingFeature |
	TicketsFeature |
	VerifyFeature;

export type Override<T, R> = Omit<T, keyof R> & R;