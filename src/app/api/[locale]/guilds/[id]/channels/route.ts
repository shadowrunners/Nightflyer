import { fetchChannels } from '@/utils/discord';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/')[4];

		if (id.length !== 18) return NextResponse.json({ err: 'Couldn\'t fetch the channels for this guild.' }, { status: 404 });

		const data = await fetchChannels(id as string);
		return NextResponse.json(data);
	}
	catch (_err) {
		console.log(_err);
	}
}