import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '@/user/entities/user.entity'; 
import { TrustMode, TrustStatus } from '../enum/trust.enum';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('trustees')
export class Trustee {
  @PrimaryGeneratedColumn()
  id: number;

  // The user who is granting trust (their card can be billed)
  @ManyToOne(() => User, user => user.trustorRelationships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trustorId' }) // This creates a foreign key column named 'trustorId'
  trustor: User;

  @Column()
  trustorId: number; // Explicit column for the trustor's ID

  // The user who is being trusted (who can bill the trustor's card)
  @ManyToOne(() => User, user => user.trusteeRelationships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trusteeId' }) // This creates a foreign key column named 'trusteeId'
  trustee: User;

  @Column()
  trusteeId: number; // Explicit column for the trustee's ID

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  maxSingleTransaction: number; // Maximum amount per single transaction

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  monthlyLimit: number; // Monthly maximum amount

  @Column({ type: 'enum', enum: TrustMode, default: TrustMode.ASK_FIRST })
  mode: TrustMode; // "Ask First" or "Trust Completely"

  @Column({ type: 'text', nullable: true })
  note: string; // Purpose of the trust, e.g., "For transportation emergencies"

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.00 })
  interestRate: number; // Interest rate for payback, e.g., 0.05 for 5%

  @Column({ type: 'enum', enum: TrustStatus, default: TrustStatus.PENDING })
  status: TrustStatus; // Current status of the trust relationship

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

    // Relationship with transactions initiated under this trust
  // This allows you to fetch all transactions related to a specific trust relationship.
  @OneToMany(() => Transaction, (transaction) => transaction.trusteeRelation)
  transactions?: Transaction[];
}
