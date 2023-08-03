import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { CurrentUser, ICurrentUser } from '../../../http/auth/current-user';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private customersService: CustomersService) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: ICurrentUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }
}
