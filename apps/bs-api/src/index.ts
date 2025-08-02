import cors from "@elysiajs/cors";
import { Context, Elysia } from "elysia";
import { auth } from "./lib/auth";
import { usersController } from "./controllers/users.controller";

const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status('Unauthorized');

        return {
          user: session.user,
          session: session.session,
        };
      }
    }
  });

const app = new Elysia({ prefix: '/api' })
  .use(betterAuth)
  .use(
    cors({
      origin: process.env.ORIGIN_WEB_URL,
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Cookie", "User-Data"],
    })
  )
  .use(usersController)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
