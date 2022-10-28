import { SetMetadata } from '@nestjs/common';
import { validRoles } from '../enums/valid-roles.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: validRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
