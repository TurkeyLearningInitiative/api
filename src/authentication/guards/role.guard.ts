import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Roles } from '~/common/constants';
import { RequestWithUser } from '../dto';

const RoleGuard = (role: Roles): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
