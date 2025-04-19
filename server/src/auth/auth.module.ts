import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthService } from './config/google.auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, GoogleAuthService, AuthGuard, RedirectGuard],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
