import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(param: {
    username: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findOneByUsername(param.username);
    if (user && user.password === param.password) {
      const { username, password, ...others } = user;
      let token = "";
      try{
        token = await this.jwtService.sign(others);
      }catch(e){
          console.error(e);
      }
      return {
        access_token: token,
        info: others,
      };
    }
    return null;
  }
}
