import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Cookie } from 'src/auth/domain';
import { HttpService } from '../http.service';

@Injectable()
export class ExpressHttpService implements HttpService {
  setCookiesOfResponse(cookies: Cookie[], response: Response) {
    cookies.map((cookie: Cookie) => {
      response.cookie(cookie.name, cookie.value, cookie.options);
    });
  }

  setCookieOfResponse(cookie: Cookie, response: Response) {
    response.cookie(cookie.name, cookie.value, cookie.options);
  }

  invalidateCookieOfResponse(cookieName: string, response: Response) {
    response.cookie(cookieName, '', { expires: new Date() });
  }

  invalidateCookiesOfResponse(cookiesName: string[], response: Response) {
    cookiesName.map((cookieName: string) => {
      response.cookie(cookieName, '', { expires: new Date() });
    });
  }
}
