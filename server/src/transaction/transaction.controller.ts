import {
  Controller,
  // Get,
  Post,
  Body,
  Req,
  UseGuards,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post('initialize')
  async initializetransaction(
    @Body() body: CreateTransactionDto,
    @Req() req: FastifyRequest,
  ) {
    const user = req.session.get('user')!;
    const result = await this.transactionService.initializeOneTimetransaction(
      body,
      user,
    );
    return result;
  }
}
