/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		accessToken: string | undefined;
	}
}