import { auth } from "../lib/auth";
import { status } from "elysia";

export async function getAccessToken(headers: Record<string, string | undefined>) {
    try {
        const res = await auth.api.getAccessToken({
            body: {
                providerId: 'discord',
            },
            headers: headers as HeadersInit,
        });

        return res.accessToken;
    } catch (err) {
        return status('Bad Request', 'Request is missing access cookie or something went wrong.');
    }
}