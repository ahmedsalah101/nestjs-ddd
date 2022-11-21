export interface AuthCookie {
  name: string;
  value: string;
  options: {
    maxAge?: number | undefined;
    signed?: boolean | undefined;
    expires?: Date | undefined;
    httpOnly?: true;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    encode?: ((val: string) => string) | undefined;
    sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
  };
}
