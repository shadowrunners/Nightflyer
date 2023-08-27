import { NextApiRequest, NextApiResponse } from 'next';
import { getAbsoluteUrl } from '@/utils/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { locale } = req.query as {
    locale?: string;
  };

	res.redirect(302, `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID as string}&redirect_uri=${getAbsoluteUrl()}/api/auth/callback&response_type=code&scope=identify+guilds&scope=identify+guilds&state=${locale ?? ''}`);
}
