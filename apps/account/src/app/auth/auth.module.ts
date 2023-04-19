import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { getJwtConfig } from '../config/jwt.config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGuard],
})
export class AuthModule {}
