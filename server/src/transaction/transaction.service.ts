/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { config } from '@/config';
import { generateTransactionRef } from '@/lib/utils';
import { User } from '@/user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async initializeOneTimetransaction(
    body: CreateTransactionDto,
    user: Partial<User>,
  ) {
    const { amount, email } = body;
    const baseUrl = config.paystack.url;
    const reference = generateTransactionRef();
    const data = {
      amount: amount * 100,
      email,
      reference,
    };
    try {
      const res = await fetch(baseUrl + '/transaction/initialize', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.paystack.secretKey}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();

      const transactionPayload = {
        user,
        amount,
        status: 'pending',
        reference,
      };

      const newTransaction =
        this.transactionRepository.create(transactionPayload);
      const transaction = await this.transactionRepository.save(newTransaction);

      return {
        msg: 'Transaction Initialized',
        data: { result, transaction },
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new Error('transaction initialization failed');
    }
  }
}
