import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly apiKey: string = process.env.SUPER_SECRET_KEY;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key;
    return this.validateRequest(key);
  }

  validateRequest(key): boolean {
    return this.apiKey === key;
  }
}
