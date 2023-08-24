import { NextApiRequest, NextApiResponse } from 'next';
import { getAbsoluteUrl } from '@/utils/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { locale } = req.query as {
    locale?: string;
  };

	return res.redirect(302, `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}?redirect_uri=${getAbsoluteUrl()}/api/auth/callback?response_type=code?scope=identify+guilds?state=${locale ?? ''}`);
}
