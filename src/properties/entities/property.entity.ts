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

export enum PropertyType {
  'CASA' = 'casa',
  'APARTAMENTO' = 'apartamento ',
}

export enum AvailableStatus {
  'AVAILABLE' = 'available',
  'RESERVED' = 'reserved',
  'UNAVAILABLE' = 'unavailable',
}

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

  @Column({ enum: PropertyType, nullable: false })
  propertyType: PropertyType;

  @Column({ enum: AvailableStatus, default: 'available', nullable: false })
  available: AvailableStatus;

  @Column({ type: 'smallint', nullable: false })
  dailyRate: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ type: 'smallint' })
  lateFee: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = AvailableStatus.AVAILABLE;
    }
  }
}
