import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}


    @Post('register')
    @UseGuards(AuthGuard)
    async register(@Body() dto: RegisterDto) {
        const user = await this.userService.createUser(dto);
        return {email: user.email};
    }
    
    @Post('login')
    @UseGuards(AuthGuard)
    async login(@Body('user') dto: LoginDto) {
        const userId = await this.authService.validateUser(dto);
        return this.authService.login(userId);
    }
}


