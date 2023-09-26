import { NextResponse } from 'next/server';
import { getGuildId } from '@/utils/utils';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
	const guild = getGuildId(req);

	const data = await prisma.guilds.findFirst({
		where: {
			guildId: guild,
		},
	});

	console.log(data?.confessions);

	if (!data) return new NextResponse('null', { status: 404 });

	return NextResponse.json({
		enabled: data?.confessions?.enabled,
		channel: data?.confessions?.channel,
		webhook: data?.confessions?.webhook,
	});
}