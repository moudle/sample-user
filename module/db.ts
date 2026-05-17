import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500 })
  name!: string;

  @Column({ type: 'varchar', length: 500 })
  email!: string;

  @Column({ type: 'varchar', length: 500 })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;
}
