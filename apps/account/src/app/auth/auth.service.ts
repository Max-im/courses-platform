import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './auth.dto';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(dto: LoginDto): Promise<string> {
        const user = await this.userRepository.findOneBy({ email: dto.email });
        const errorMsg = 'Invalid email or password';

        if (!user) {
            throw new HttpException(errorMsg, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const userEntity = new UserEntity();
        Object.assign(userEntity, user);
        const isCorrectPass = await userEntity.validatePassword(dto.password);

        if (!isCorrectPass) {
            throw new HttpException(errorMsg, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return userEntity.id;
    }

    async login(id: string) {
        return {
            access_token: await this.jwtService.signAsync({ id })
        }
    }
}
