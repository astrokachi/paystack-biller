import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '@/user/entities/user.entity'; // Adjust path if necessary
import { Trustee } from '@/trustee/entities/trustee.entity'; // Import Trustee entity
import { TransactionStatus, TransactionType } from '../enum/transaction.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // Foreign key for the user involved in the transaction

  // Relationship to the Trustee entity: This links the transaction to the specific
  // trust agreement under which it was initiated.
  @ManyToOne(() => Trustee, (trustee) => trustee.transactions)
  @JoinColumn({ name: 'trusteeId' }) // Foreign key column in the Transaction table
  trusteeRelation: Trustee; // Name of the relation property

  @Column()
  trusteeId: number; // Foreign key for the specific trustee relationship

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType; // 'Bill' or 'Repayment'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string; // e.g., "Stranded, need Uber ride home"

  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  interestCharged?: number; // Amount of interest applied to the loan

  @Column({ type: 'timestamp', nullable: true })
  repaymentDueDate?: Date; // For 'Bill' type transactions, when repayment is expected

  @Column({ unique: true, nullable: true })
  reference: string; // A unique payment gateway reference ID or internal ID

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date; // To track when status or other details are updated
}
