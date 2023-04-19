import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!(request.body && request.body.email && request.body.password)) {
            throw new HttpException('Email and Password are required', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return true;
    }
}
