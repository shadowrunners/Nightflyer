import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const id = url.pathname.split('/').pop();

	const data = await prisma.guilds.findFirst({
		where: {
			guildId: id as string,
			levels: {
				enabled: true,
			},
		},
	});

	if (!data) return new NextResponse('null', { status: 404 });

	return NextResponse.json({ enabled: data?.antiphishing?.enabled });
}