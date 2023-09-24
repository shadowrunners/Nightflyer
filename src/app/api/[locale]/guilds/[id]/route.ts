import { fetchGuild } from '@/utils/discord';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/').pop();
		const data = await fetchGuild(id as string);

		const features: Feature[] = [];
		const getFeatures = await prisma.guilds.count({
			where: {
				guildId: id,
			},
		});

		if (getFeatures !== 0) features.push('confessions', 'antiphishing', 'goodbye', 'logs', 'levelling', 'tickets', 'verification', 'welcome');

		return NextResponse.json({
			id: data?.id,
			name: data?.name,
			icon: data?.icon,
			enabledFeatures: features,
		});
	}
	catch (_err) {
		console.log(_err);
	}
}

type Feature = 'confessions' | 'antiphishing' | 'goodbye' | 'logs' | 'levelling' | 'tickets' | 'verification' | 'welcome';