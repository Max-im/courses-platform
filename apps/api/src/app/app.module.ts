import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { JWTAuthGuard } from './guards/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { getRMQConfig } from './config/rmq.config';
import { getJwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'envs/.api.env', isGlobal: true}),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [JWTAuthGuard]

})
export class AppModule {}
