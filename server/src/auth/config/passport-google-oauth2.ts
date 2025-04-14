/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

type Name = {
  givenName: string;
  familyName: string;
};

type Email = {
  value: string;
};

type Photo = {
  value: string;
};

interface Profile {
  emails: Email[];
  name: Name;
  photos: Photo[];
  displayName: string;
  birthday: string;
  gender: string;
  coverPhoto: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos, displayName, birthday, gender, coverPhoto } =
      profile;
    const user: User = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      id: 0,
      displayName,
      birthday,
      gender,
      coverPhoto,
    };

    return done(null, user);
  }
}
