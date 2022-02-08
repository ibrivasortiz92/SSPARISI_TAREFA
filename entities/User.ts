import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
import { IsArray, IsEmail, Length, MaxLength, ValidateNested } from 'class-validator';


@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 20)
    name: string;

    @Column()
    @MaxLength(18)
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