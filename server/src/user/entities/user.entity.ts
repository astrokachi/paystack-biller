import { Transaction } from '@/transaction/entities/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  coverPhoto: string;

  @Column()
  accessToken: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions?: Transaction[];
}
