import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule], 
    exports: [EventsGateway],
    providers: [EventsGateway],
})
export class EventsModule {}