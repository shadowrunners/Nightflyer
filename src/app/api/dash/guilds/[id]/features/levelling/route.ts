import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const data = await prisma.guilds.findFirst({
		where: {
			guildId: req.query.id as string,
			levels: {
				enabled: true,
			},
		},
	});

	if (!data) return null;

	res.status(200).json({ enabled: data?.antiphishing?.enabled });
}