import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserFindOneEvent } from 'src/shared/events';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly bus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    const user = await this.bus.execute(new UserFindOneEvent(userId));
    return Boolean(user);
  }
}
