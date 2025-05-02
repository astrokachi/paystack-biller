import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
// create custom google auth service
@Injectable()
export class GoogleAuthService {
  private googleOauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL,
  );

  getAuthUrl() {
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const authorizationUrl = this.googleOauth2.generateAuthUrl({
      access_type: 'offline',
      scope,
    });

    return authorizationUrl; // this returns a code used for verification
  }

  async getTokensAndUserInfo(code: string) {
    // exchange code returned from auth url for token and user profile
    const { tokens } = await this.googleOauth2.getToken(code);
    if (tokens.access_token) {
      const userInfo = await this.verifyAccessToken(tokens.access_token);
      return {
        tokens,
        user: userInfo,
      };
    }
    return null;
  }

  // verify access token and make sure it's not expired
  async verifyAccessToken(token: string) {
    try {
      this.googleOauth2.setCredentials({ access_token: token });
      const oauth2 = google.oauth2({ version: 'v2', auth: this.googleOauth2 });
      console.log(await oauth2.userinfo.get(), '---------> verify');
      const userInfo = await oauth2.userinfo.get();
      console.log(userInfo);
      return userInfo;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return null;
    }
  }
}
