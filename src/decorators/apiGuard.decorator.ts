import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

export function ApiGuard() {
  return applyDecorators(
    ApiSecurity('Authorisation'),
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
