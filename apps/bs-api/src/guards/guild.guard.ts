import Elysia from "elysia";
import { verifyJWT } from "../utils/verifyJWT";
import { getGuildMember } from "../services/bot.service";

export const guildGuard = new Elysia()
    .derive({ as: 'scoped' }, async (req) => {
        // typed as string since this validation is already done in the other guard :)
        const token = req.headers['authorization'] as string;

        const payload = await verifyJWT(req.headers);
        const guildId = req.path.split('/')[2];

        let member;
        try {
            member = await getGuildMember(guildId, payload.id as string);
        } catch (_err) {
            return _err;
        }
    })  