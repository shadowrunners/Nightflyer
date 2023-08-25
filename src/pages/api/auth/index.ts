import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from '@/utils/auth/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = getServerSession(req);

	if (!session.success) return res.status(301).redirect('/dash/auth/login');
	res.status(200).json(session.data);
}
