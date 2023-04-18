import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}


    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.userService.createUser(dto);
        return {email: user.email};
    }
    
    @Post('login')
    async login(@Body('user') dto: LoginDto) {
        const userId = await this.authService.validateUser(dto);
        return this.authService.login(userId);
    }
}


