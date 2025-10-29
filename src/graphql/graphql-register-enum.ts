import { registerEnumType } from '@nestjs/graphql';
import { Role, Permission } from '@auth/auth-types';

registerEnumType(Role, {
  name: 'Role',
});

registerEnumType(Permission, {
  name: 'Permission',
});
