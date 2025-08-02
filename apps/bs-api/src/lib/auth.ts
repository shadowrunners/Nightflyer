import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DATABASE_URL as string);
const db = client.db();

export const auth = betterAuth({
    appName: 'blackspace-canterbury',
    database: mongodbAdapter(db),
    account: {
        encryptOAuthTokens: true,
    },
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            disableDefaultScope: true,
            scope: ['identify'],
        },
    },
    session: {
        cookieCache: {
            enabled: true,
        },
    },
    trustedOrigins: ['http://localhost:3000'],
    secret: process.env.BETTER_AUTH_SECRET,
});