export interface IAuthFormType {
  email: string;
  password: string;
  name?: string;
  passwordConfirm?: string;
}

export interface IUserDataType {
  _id: string;
  email: string;
  password?: string | null;
  name: string | null;
}
