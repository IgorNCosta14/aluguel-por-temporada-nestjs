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
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  totalRate: number;

  @Column()
  totalLateFee?: number;

  @CreateDateColumn()
  startDate: Date;

  @Column()
  expectedReturnDate: Date;

  @Column()
  expectedTotalRate: number;

  @Column()
  endDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
