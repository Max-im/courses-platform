import { IUserCourses, PurchaseState } from '@courses/interfaces';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name: 'users-courses'})
export class UserCourseEntity implements IUserCourses {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({enum: PurchaseState, type: String})
    purchaseState: string;

    @OneToMany(() => UserEntity, (user) => user.id, {eager: true})
    userId: UserEntity;
}