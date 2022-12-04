import { Injectable } from '@nestjs/common';
import { AuthCookie, JwtPayload, Tokens } from 'src/modules/auth/domain';

@Injectable()
export abstract class JwtAuthService {
  abstract genAuthCookies<T extends JwtPayload>(tokenPayload: T): AuthCookie[];
  abstract genTokens<T extends JwtPayload>(tokenPayload: T): Tokens;
}
