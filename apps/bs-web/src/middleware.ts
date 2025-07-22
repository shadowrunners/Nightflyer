import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/guilds', '/pickaguild'];

export default function middleware(req: NextRequest) {
	const response = NextResponse.next();

	const localeCookie = req.cookies.get('bs-locale');
	if (!localeCookie) response.cookies.set('bs-locale', 'en');

	const isProtected = protectedRoutes.some((prefix) =>
		req.nextUrl.pathname === prefix || req.nextUrl.pathname.startsWith(`${prefix}/`),
	);

	if (isProtected) {
		const sessionCookie = getSessionCookie(req);

		if (!sessionCookie) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next|.*\\\\..*).*)'],
};
