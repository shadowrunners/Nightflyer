import { fetchChannels } from '@/utils/discord';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/').pop();
		const data = await fetchChannels(id as string);

		return NextResponse.json({ data });
	}
	catch (_err) {
		console.log(_err);
	}
}