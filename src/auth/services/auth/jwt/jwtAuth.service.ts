import { Injectable } from '@nestjs/common';
import { AuthCookie, Tokens } from 'src/auth/domain';
import { JwtPayload } from 'src/auth/domain/jwt.payload';


@Injectable()
export abstract class JwtAuthService {
  abstract genAuthCookies<T extends JwtPayload>(tokenPayload: T): AuthCookie[];
  abstract genTokens<T extends JwtPayload>(tokenPayload: T): Tokens;
}
