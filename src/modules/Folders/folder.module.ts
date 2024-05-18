import { FolderService } from './services/folder.service';
import { FolderController } from './controllers/folder.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { FileSchema } from '../files/schemas/file.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Folder.name, schema: FolderSchema },
         //{ name: 'File', schema: FileSchema }
    ]),
    
    ],
    controllers: [FolderController ],
    providers: [FolderService ],
   exports : [ FolderService ]
})
export class FolderModule {}
