import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 9 })
  zipCode: string;

  @Column({ length: 20 })
  country: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;
}
