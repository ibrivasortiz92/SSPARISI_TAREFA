import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cnpj: string;

    @Column({
        default: null,
    })
    address: string;

    @Column({
        type: 'simple-array',
        default: null,
    })
    emails: string[];

}