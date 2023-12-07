export interface UserType {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  profileURL?: string;
  password?: string;
  role: UserRolesType;
  isAccepted: Boolean;
}

export type UserRoles = "admin" | "monitoring" | "financial";
export type UserRolesType =
  | "sales manager"
  | "customer support"
  | "general manager"
  | "teacher"
  | "parent"
  | "no role";
