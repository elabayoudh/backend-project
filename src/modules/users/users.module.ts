import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/user.schema';
import { FileUploadService } from './services/uploadProfilePicture.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema } ,],), 
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './upload/profile-pictures',
          filename: (req, file, cb) => {
            return cb(null, `${file.originalname}`);
          },
        }),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService  , FileUploadService],
  exports: [UserService , MongooseModule.forFeature([{ name: User.name, schema: UserSchema } ,],) ],
})
export class UsersModule {}
