import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Address } from '../address/entities/address.entity';

@Entity('properties')
export class Property {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 20 })
  propertyName: string;

  @Column({ length: 50 })
  propertyOwner: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'tinyint' })
  propertyAddressId: number;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'propertyAddressId' })
  address: Address;

  @Column({ type: 'tinyint' })
  propertyNumber: string;

  @Column({ length: 20 })
  typeProperty: string;

  @Column('boolean')
  available: boolean;

  @Column({ type: 'tinyint' })
  dailyRate: number;

  @CreateDateColumn({ type: 'time' })
  createdAt: Date;

  @CreateDateColumn({ type: 'time' })
  updatedAt: Date;

  @Column({ type: 'tinyint' })
  lateFee: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
