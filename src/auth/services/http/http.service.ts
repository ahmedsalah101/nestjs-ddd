import { Cookie } from 'src/auth/domain';

export abstract class HttpService {
  abstract setCookieOfResponse(cookie: Cookie, response): void;
  abstract setCookiesOfResponse(cookies: Cookie[], response): void;
  abstract invalidateCookieOfResponse(cookieName: string, response): void;
  abstract invalidateCookiesOfResponse(cookies: string[], response): void;
}
