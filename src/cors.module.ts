import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import cors from 'cors';

@Module({})
export class CorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cors({ origin: 'http://localhost:3001', methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
    .forRoutes('*');
  }
} 

// you have created a CorsModule that applies the cors middleware to all routes ('*') 
// with the origin set to 'http://localhost:3001'.
//Therefore, you do not need to add API routes in the CORS file or configure CORS for each route separately.


// The CORS configuration is applied at the server level and not at the route level. 
// This means that once you have enabled CORS in your NestJS application, it will apply to all routes by default.



// This will allow requests from any origin to your NestJS application.
// consumer
// .apply(cors())
// .forRoutes('*'); 

