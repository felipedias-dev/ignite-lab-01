import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { StudentsService } from '../services/students.service';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { EnrollmentsService } from '../services/enrollments.service';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { CoursesService } from '../services/courses.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    StudentsResolver,
    StudentsService,
    EnrollmentsResolver,
    EnrollmentsService,
    CoursesResolver,
    CoursesService,
  ],
})
export class HttpModule {}
