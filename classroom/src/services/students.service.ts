import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  listStudents() {
    return this.prismaService.student.findMany();
  }

  findStudentById(id: string) {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
    });
  }

  findStudentByAuthUserId(authUserId: string) {
    return this.prismaService.student.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
