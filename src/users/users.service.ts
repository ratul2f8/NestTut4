import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  password: string;
  username: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Helena',
      password: 'password',
      username: 'helena',
    },
    {
      id: 2,
      name: 'Ronnie',
      password: 'password',
      username: 'ronnie',
    },
  ];

  async findOneByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username);
  }
}
