export enum UserRole {
  user  = "User",
  admin = "Admin"
}

export interface User {
  uid: string
  email: string
  role: UserRole
  displayName?: string
  photoURL?: string
}
