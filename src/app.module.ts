import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentications/authentications.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://myselfswk:waleed1999@cluster0.wqwkt.mongodb.net/nestjs-crud"),
    // MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wqwkt.mongodb.net/nestjs-crud`),
    UsersModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }