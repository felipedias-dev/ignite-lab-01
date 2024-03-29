import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface ICreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer({ authUserId }: ICreateCustomerParams) {
    return await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
