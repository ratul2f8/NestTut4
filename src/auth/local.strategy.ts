import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super();
    }
    async validate(username: string, password: string){
        const data = await this.authService.validateUser({username, password});
        if(!data){
            throw new NotFoundException('User with this credential not found');
        }
        return data;
    }
}