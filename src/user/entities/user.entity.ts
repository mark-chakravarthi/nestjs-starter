import { Exclude } from 'class-transformer';

export class User {
  username: string;
  id: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
