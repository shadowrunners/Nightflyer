import { HttpStatus, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: FastifyRequest['raw'], _: FastifyReply, next: () => void) {
		if (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer '))
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

		next();
	}
}
