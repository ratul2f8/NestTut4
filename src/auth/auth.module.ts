import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './jwt-auth.guard';
import { JWTStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JWTStrategy,JWTAuthGuard],
  imports: [UsersModule, PassportModule,ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:async (configService: ConfigService) => {
      // console.log("Jwt secret is: ", configService.get('JWT_SECRET'));
      // console.log("Jwt timeout is: ", configService.get('JWT_SESSION_TIMEOUT'));
      return {
        signOptions: {
          expiresIn: configService.get('JWT_SESSION_TIMEOUT'),
          algorithm: "HS512"
        },
        secret: configService.get('JWT_SECRET'),
      }
    }
  })],
  exports: [LocalAuthGuard, JWTAuthGuard]
})
export class AuthModule {}
