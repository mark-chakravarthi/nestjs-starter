import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const password = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password });

    return this.userRepository.save(newUser);
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  findAll() {
    return this.userRepository.find();
  }
}
