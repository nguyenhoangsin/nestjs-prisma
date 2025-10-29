export const ROLES_METADATA_KEY = 'roles';
export const PERMISSIONS_METADATA_KEY = 'permissions';
export const PUBLIC_METADATA_KEY = 'isPublic';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Permission {
  CREATE_POST = 'CREATE_POST',
  EDIT_POST = 'EDIT_POST',
  DELETE_USER = 'DELETE_USER',
  VIEW_PROFILE = 'VIEW_PROFILE',
}

export type UserPayload = {
  userId: string;
  roles: Role[];
  permissions: Permission[];
};
