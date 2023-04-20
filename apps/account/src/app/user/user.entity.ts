import { IUser } from '@courses/interfaces';
import { genSalt, hash, compare } from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserCourseEntity } from './user-course.entity';

@Entity({name: 'users'})
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true, nullable: true})
    displayName?: string;

    @Column()
    passwordHash: string;

    @Column({default: 'Student'})
    role: string

    @ManyToMany(() => UserCourseEntity)
    @JoinTable()
    userCourses: UserCourseEntity[];

    async setPassword(password: string) {
        const salt = await genSalt(10);
        this.passwordHash = await hash(password, salt);
        return this;
    }

    async validatePassword(password: string) {
        return compare(password, this.passwordHash);
    }
}