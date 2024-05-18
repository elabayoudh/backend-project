import { Module } from '@nestjs/common';
import { FileService } from './Service/fileService';
import { UploadFileController } from './controller/upload-file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/file.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  controllers: [UploadFileController],
  providers: [FileService],
  exports: [FileService],
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './upload',
          filename: (req, file, cb) => {
            return cb(null, `${file.originalname}`);
          },
        }),
      }),
    }),

  ],
})
export class FilesModule {}
