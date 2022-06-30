import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string) {
    const user = this.userService.findOne(email);

    if (user) {
      console.log('user', user);
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        delete user.password;
        return user;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
