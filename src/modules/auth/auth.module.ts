import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './config/strategy/local.strategy';
import { JwtStrategy } from './config/strategy/jwt.strategy';
import { FileUploadService } from '../users/services/uploadProfilePicture.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy , FileUploadService 
  ],
})
export class AuthModule {}
