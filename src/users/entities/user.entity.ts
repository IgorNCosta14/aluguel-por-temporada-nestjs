@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userPermission: number;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'userPermission' })
  permission: Permission;

  @Column()
  activeUser: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.userPermission = 1;
      this.activeUser = true;
    }
  }
}
