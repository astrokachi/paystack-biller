import { Injectable } from '@nestjs/common';
import { Profile } from './strategies/google.strategy';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(profile: Profile, accessToken: string) {
    console.log('profile', profile);
    const user = await this.userRepository.findOne({
      where: {
        email: profile.emails[0].value,
      },
    });

    if (user) return user;

    const newUser = this.userRepository.create({ ...profile, accessToken });
    await this.userRepository.save(newUser);

    return newUser;
  }
}
