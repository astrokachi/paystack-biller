import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column()
  birthday: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  picture: string;

  @Column()
  coverPhoto: string;

  @Column()
  accessToken: string;
}
