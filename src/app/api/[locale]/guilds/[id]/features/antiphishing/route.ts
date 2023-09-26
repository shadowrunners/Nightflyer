import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getGuildId } from '@/utils/utils';

export async function GET(req: Request) {
	const guild = getGuildId(req);

	const data = await prisma.guilds.findFirst({
		where: {
			guildId: guild,
			antiphishing: {
				enabled: true,
			},
		},
	});

	if (!data) return NextResponse.json({ enabled: null });

	return NextResponse.json({ enabled: data?.antiphishing?.enabled });
}

export async function POST(req: Request) {
	const guild = getGuildId(req);

	await prisma.guilds.updateMany({
		where: {
			guildId: guild,
		},
		data: {
			antiphishing: {
				enabled: true,
			},
		},
	});

	return new NextResponse('Success', { status: 200 });
}

export async function DELETE(req: Request) {
	const guild = getGuildId(req);

	await prisma.guilds.updateMany({
		where: {
			guildId: guild,
			antiphishing: {
				enabled: true,
			},
		},
		data: {
			antiphishing: {
				enabled: false,
			},
		},
	});

	return new NextResponse('Success', { status: 200 });
}