import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Property } from 'src/properties/entities/property.entity';

@Entity('rentals')
export class Rental {
  @PrimaryColumn({ type: 'uuid', nullable: false, unique: true })
  id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column({ type: 'uuid', nullable: false })
  propertyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'tinyint', nullable: true })
  totalRate: number;

  @Column({ type: 'tinyint', nullable: true })
  totalLateFee?: number;

  @CreateDateColumn({ type: 'time', nullable: false })
  startDate: Date;

  @Column({ type: 'time', nullable: false })
  expectedReturnDate: Date;

  @Column({ type: 'tinyint', nullable: false })
  expectedTotalRate: number;

  @Column({ type: 'time', nullable: true })
  endDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
