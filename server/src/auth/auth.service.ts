import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GaxiosResponse } from 'googleapis-common';
import { oauth2_v2 } from 'googleapis';
import { Credentials } from 'google-auth-library';
// import { CreateUserDto } from '@/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async saveUser(
    userData: GaxiosResponse<oauth2_v2.Schema$Userinfo>,
    token: Credentials,
  ) {
    const { email, given_name, family_name, picture } = userData.data;
    if (!email) {
      return null;
    }

    const accessToken = token.access_token;
    const existingUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User();
    newUser.email = email;
    newUser.firstName = given_name!;
    newUser.lastName = family_name!;
    newUser.coverPhoto = picture!;
    newUser.accessToken = accessToken!;
    const user = await this.userRepository.save(newUser);
    return user;
  }
}
