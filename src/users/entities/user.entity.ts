import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ type: 'tinyint' })
  userPermission: number;

  // @ManyToOne(() => Permission)
  // @JoinColumn({ name: 'userPermission' })
  // permission: Permissions;

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
