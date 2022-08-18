import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';
import { Permission } from '../permissions/entities/permission.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 14, nullable: false })
  cpf: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column({ type: 'tinyint' })
  userPermission: number;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'userPermission' })
  permission: Permission;

  @Column({ type: 'boolean' })
  activeUser: boolean;

  @CreateDateColumn({ type: 'time' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.userPermission = 1;
      this.activeUser = true;
    }
  }
}
