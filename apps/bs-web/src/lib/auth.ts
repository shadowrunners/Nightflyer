import { createAuthClient } from 'better-auth/react';

export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
});

export async function discordSignIn() {
    return await signIn.social({
        provider: 'discord',
        callbackURL: process.env.NEXT_PUBLIC_APP_URL,
    });
}