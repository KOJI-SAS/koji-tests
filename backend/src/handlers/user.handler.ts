import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  UserCreateEvent,
  UserDeleteEvent,
  UserFindEvent,
  UserFindOneEvent,
  UserUpdateEvent,
} from 'src/shared/events';
import User from 'src/entities/User';

// -------------------------------------
// Create handler ----------------------
// -------------------------------------
@QueryHandler(UserCreateEvent)
export class CreateHandler implements IQueryHandler<UserCreateEvent, User> {
  constructor(private readonly repository: InMemoryDBService<User>) {}

  async execute(event: UserCreateEvent) {
    return this.repository.create({
      ...event.data,
      __type: 'User',
      createdAt: Math.floor(new Date().getTime() / 1000),
    });
  }
}

// -------------------------------------
// Update handler ----------------------
// -------------------------------------
@QueryHandler(UserUpdateEvent)
export class UpdateHandler implements IQueryHandler<UserUpdateEvent, void> {
  constructor(private readonly repository: InMemoryDBService<User>) {}

  async execute(event: UserUpdateEvent) {
    const record = this.repository.get(event.id);
    Object.keys(event.data).forEach((key) => {
      record[key] = event.data[key];
    });
    return this.repository.update({
      ...record,
      updatedAt: Math.floor(new Date().getTime() / 1000),
    });
  }
}

// -------------------------------------
// Delete handler ----------------------
// -------------------------------------

@QueryHandler(UserDeleteEvent)
export class DeleteHandler implements IQueryHandler<UserDeleteEvent, void> {
  constructor(private readonly repository: InMemoryDBService<User>) {}

  async execute(event: UserDeleteEvent) {
    return this.repository.delete(event.id);
  }
}

// -------------------------------------
// Find one handler --------------------
// -------------------------------------
@QueryHandler(UserFindOneEvent)
export class FindOneHandler implements IQueryHandler<UserFindOneEvent, User> {
  constructor(private readonly repository: InMemoryDBService<User>) {}

  async execute(event: UserFindOneEvent) {
    return this.repository.get(event.id);
  }
}

// -------------------------------------
// Find handler ------------------------
// -------------------------------------

@QueryHandler(UserFindEvent)
export class FindHandler implements IQueryHandler<UserFindEvent, User[]> {
  constructor(private readonly repository: InMemoryDBService<User>) {}

  async execute(event: UserFindEvent) {
    return this.repository.query(
      (current) =>
        current.__type === 'User' &&
        Object.keys(event.filter).reduce(
          (acc: boolean, filterKey: string) =>
            acc && current[filterKey] === event.filter[filterKey],
          true,
        ),
    );
  }
}
