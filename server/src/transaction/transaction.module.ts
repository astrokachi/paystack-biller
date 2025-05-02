import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { Transaction } from './entities/transaction.entity';
import { GoogleAuthService } from '@/auth/config/google.auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService, AuthGuard, GoogleAuthService],
})
export class TransactionModule {}
