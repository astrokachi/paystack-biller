// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '@/transaction/entities/transaction.entity'; // Keep your existing import
import { Trustee } from '@/trustee/entities/trustee.entity'; // Import the new Trustee entity

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

  @Column({ nullable: true }) // Assuming cover photo might be optional
  coverPhoto: string;

  @Column({ nullable: true }) // Assuming accessToken might be optional or handled differently
  accessToken: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions?: Transaction[];

  // Relationships where this user is the one granting trust (their card can be billed)
  @OneToMany(() => Trustee, (trustee) => trustee.trustor)
  trustorRelationships: Trustee[];

  // Relationships where this user is the one being trusted (who can bill others)
  @OneToMany(() => Trustee, (trustee) => trustee.trustee)
  trusteeRelationships: Trustee[];
}
