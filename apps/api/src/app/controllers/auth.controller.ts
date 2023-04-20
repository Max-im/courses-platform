import {
  Controller,
  Body,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@courses/contracts';
import { JWTAuthGuard } from '../guards/auth.guard';
import { RMQService } from 'nestjs-rmq';
import { RegisterDTO } from '../dto/account.register';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDTO): Promise<AccountRegister.Response> {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  // @UseGuards(JWTAuthGuard)
  async login(@Body('user') dto: LoginDTO): Promise<AccountLogin.Response> {
    try {
      return await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
