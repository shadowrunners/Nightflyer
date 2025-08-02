import { jwtGuard } from '../guards/jwt.guard';
import { getBotGuilds } from '../services/bot.service';
import { getCurrentUserGuilds } from '../services/users.service';
import { getAccessToken } from '../utils/getAccessToken';
import { Elysia } from 'elysia';
import { verifyJWT } from '../utils/verifyJWT';

export const guildsController = new Elysia({ prefix: '/guilds' })
    .use(jwtGuard)
    .get('/', () => 'hi')
    .get('/:guildId', async ({ params: { guildId } }) => {

    })