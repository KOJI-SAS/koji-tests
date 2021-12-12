import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { LoginEvent, UserCreateEvent, UserFindEvent } from 'src/shared/events';
import { JwtService } from '@nestjs/jwt';

@QueryHandler(LoginEvent)
export class LoginHandler implements IQueryHandler<LoginEvent, string> {
  constructor(
    private readonly bus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(event: LoginEvent) {
    const users = await this.bus.execute(new UserFindEvent(event));
    let user;
    if (users.length > 0) {
      user = users[0];
    } else {
      user = await this.bus.execute(new UserCreateEvent(event));
    }
    return this.jwtService.sign(user.id);
  }
}
