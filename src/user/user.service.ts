import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const user = this.findOne(createUserDto.email);

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const password = bcrypt.hashSync(createUserDto.password, 10);
    this.users.push({ ...createUserDto, password, id: this.users.length + 1 });
  }

  findAll() {
    return this.users;
  }

  findOne(email: string) {
    console.log('users', this.users);
    return this.users.find((user) => user.email === email);
  }
}
