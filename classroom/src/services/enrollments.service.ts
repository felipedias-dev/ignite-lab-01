import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prismaService: PrismaService) {}

  listEnrollments() {
    return this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByUserId(id: string) {
    return this.prismaService.enrollment.findMany({
      where: {
        studentId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
