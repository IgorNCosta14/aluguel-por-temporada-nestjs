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
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ length: 20 })
  propertyName: string;

  @Column({ length: 50, nullable: true })
  propertyOwner: string;

  @Column({ length: 500, nullable: false })
  description: string;

  @Column({ type: 'smallint', nullable: false })
  propertyAddressId: number;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'propertyAddressId' })
  address: Address;

  @Column({ nullable: false })
  propertyNumber: string;

  @Column({ length: 20, nullable: false })
  typeProperty: string;

  @Column({ type: 'boolean', nullable: false })
  available: boolean;

  @Column({ type: 'smallint', nullable: false })
  dailyRate: number;

  @CreateDateColumn({ type: 'time', nullable: false })
  createdAt: Date;

  @CreateDateColumn({ type: 'time', nullable: false })
  updatedAt: Date;

  @Column({ type: 'smallint' })
  lateFee: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
