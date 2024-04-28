import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class XUbidGuard implements CanActivate {
 canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ubid = request.headers['x-ubid'];
    if (!ubid) {
        throw new HttpException('X-UBID header required to access this resource', HttpStatus.FORBIDDEN);
    }
    return true;
 }
}
