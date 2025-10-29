import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from './.module';

@Module({
  imports: [Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
