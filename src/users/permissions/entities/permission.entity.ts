import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permissions')
class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'boolean' })
  isLandlord: boolean;

  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'time' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.isAdmin = false;
      this.isLandlord = false;
    }
  }
}

export { Permission };
