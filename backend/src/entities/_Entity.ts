import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export default class _Entity implements InMemoryDBEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
  __type: string;
}
