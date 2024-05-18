import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Publication, PublicationSchema } from "./schema/publication.schema";
import { PublicationController } from "./controller/publication.controller";
import { PublicationService } from "./services/publication.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Publication.name, schema: PublicationSchema }])],
    controllers: [PublicationController],
    providers: [PublicationService],
})
export class PublicationModule {}