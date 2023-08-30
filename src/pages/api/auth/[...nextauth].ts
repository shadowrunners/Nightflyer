import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: NextAuthOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;

			return session;
		},
	},
};

export default NextAuth(authOptions);