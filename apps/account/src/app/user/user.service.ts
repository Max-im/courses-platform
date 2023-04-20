import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRegister } from '@courses/contracts';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity'; 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }

    async getUserByName(displayName: string) {
        return await this.userRepository.findOneBy({ displayName });
    }

    async createUser(dto: AccountRegister.Request): Promise<UserEntity> {
        const userByEmail = await this.getUserByEmail(dto.email);

        if (userByEmail) {
            throw new HttpException('Email is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        if (dto.displayName) {
            const userByName = await this.getUserByName(dto.displayName);
            if (userByName) {
                throw new HttpException('Username is taken', HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }

        const userEntity = new UserEntity();
        Object.assign(userEntity, dto);
        await userEntity.setPassword(dto.password);
        return await this.userRepository.save(userEntity);
    }
}
