import { Exclude } from 'class-transformer';
import { Role } from 'src/role/role.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@ManyToOne(() => Role)
	@JoinColumn({ name: 'role_id' })
	role: Role;
}
