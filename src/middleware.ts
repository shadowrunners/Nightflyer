import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en'];
const publicPages = ['/', '/privacy', '/tos', '/auth/login'];

const intlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'en',
});

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	function onSuccess(req) {
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token }) => token != null,
		},
		pages: {
			signIn: '/auth/login',
		},
	},
);

export default function middleware(req: NextRequest) {
	const publicPathnameRegex = RegExp(
		`^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
		'i',
	);
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

	if (isPublicPage) {
		return intlMiddleware(req);
	}
	else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (authMiddleware as any)(req);
	}
}
export const config = { matcher: ['/guilds/:path*', '/dash/:path*', '/api/guilds/:path*', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'] };
