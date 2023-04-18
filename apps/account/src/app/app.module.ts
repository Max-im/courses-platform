import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getDbConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: 'envs/.account.env'}),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync(getDbConfig())],
})
export class AppModule {}
