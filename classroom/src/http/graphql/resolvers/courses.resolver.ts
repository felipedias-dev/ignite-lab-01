import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from '../../../services/courses.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  listCourses() {
    return this.coursesService.listCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  getCourse(@Args('id') id: string) {
    return this.coursesService.findCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
