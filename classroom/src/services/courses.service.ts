import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  listCourses() {
    return this.prismaService.course.findMany();
  }

  findCourseById(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });
    const courseExists = await this.prismaService.course.findFirst({
      where: {
        slug,
      },
    });

    if (courseExists) {
      throw new Error('Course already exists');
    }

    return this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
