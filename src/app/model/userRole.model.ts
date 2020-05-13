export class UserRoleModel{
    id: number;
    roleType: Role;
}

enum Role {
    ADMIN,
    USER
  }