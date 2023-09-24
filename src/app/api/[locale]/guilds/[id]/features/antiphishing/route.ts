import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const id = url.pathname.split('/').pop();

	const data = await prisma.guilds.findFirst({
		where: {
			guildId: id as string,
			antiphishing: {
				enabled: true,
			},
		},
	});

	if (!data) return NextResponse.json({ enabled: null });

	return NextResponse.json({ enabled: data?.antiphishing?.enabled });
}

