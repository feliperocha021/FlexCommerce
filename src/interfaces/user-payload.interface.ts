export interface AccessTokenPayload {
  sub: string;
  name: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}
