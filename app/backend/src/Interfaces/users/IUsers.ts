export interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

export interface IUserLogin {
  email: string,
  password: string,
}

export interface IUserRole {
  id: number,
  username: string,
  role: 'admin' | 'user',
}
