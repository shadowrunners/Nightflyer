import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	console.log('Route pinged.')
	return new Response('Response');
}