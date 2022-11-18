export interface TokenOptions {
  secret: string;
  expiresIn: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
