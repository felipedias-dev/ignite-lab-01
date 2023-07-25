import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [TestController],
})
export class HttpModule {}
