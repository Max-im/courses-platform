import { Controller, Body, UseGuards } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@courses/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}


    @RMQValidate()
    @RMQRoute(AccountRegister.topic)
    async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
        const user = await this.userService.createUser(dto);
        return {email: user.email};
    }
    
    @RMQValidate()
    @RMQRoute(AccountLogin.topic)
    async login(@Body('user') dto: AccountLogin.Request): Promise<AccountLogin.Response> {
        const userId = await this.authService.validateUser(dto);
        return this.authService.login(userId);
    }
}


