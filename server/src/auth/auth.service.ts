import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
}
