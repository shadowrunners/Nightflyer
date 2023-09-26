import { fetchGuild } from '@/utils/discord';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/').pop();
		const data = await fetchGuild(id as string);

		const guild = await prisma.guilds.findFirst({
			where: {
				guildId: id,
			},
		});

		const features = [
			{ name: 'antiphishing', enabled: () => guild?.antiphishing?.enabled },
			{ name: 'confessions', enabled: () => guild?.confessions?.enabled },
			{ name: 'goodbye', enabled: () => guild?.goodbye?.enabled },
			{ name: 'logs', enabled: () => guild?.logs?.enabled },
			{ name: 'levelling', enabled: () => guild?.levels?.enabled },
			{ name: 'tickets', enabled: () => guild?.tickets?.enabled },
			{ name: 'verification', enabled: () => guild?.verification?.enabled },
			{ name: 'welcome', enabled: () => guild?.welcome?.enabled },
		];

		return NextResponse.json({
			id: data?.id,
			name: data?.name,
			icon: data?.icon,
			enabledFeatures: features.filter((feature) => feature.enabled()).map((feature) => feature.name),
		});
	}
	catch (_err) {
		console.log(_err);
	}
}