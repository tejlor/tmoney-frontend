import {Expose} from "class-transformer";

export class TokenInfo {
  @Expose({name: 'access_token'})
  accessToken: string;

  @Expose({name: 'refresh_token'})
  refreshToken: string;

  @Expose({name: 'token_type'})
  tokenType: string;

  scope: string;

  @Expose({name: 'expires_in'})
  expiresIn: number;
}