import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { CurrentUser, ICurrentUser } from '../../../http/auth/current-user';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: ICurrentUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.getPurchasesByCustomerId(customer.id);
  }
}
