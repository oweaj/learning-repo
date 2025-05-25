export interface ISignInType {
  email: string;
  password: string;
}

export interface ISignUpType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface TAuthFormType {
  email: string;
  password: string;
  name?: string;
  passwordConfirm?: string;
}

export interface userDataType {
  email: string;
  id: string | null;
  name: string | null;
  phone_number: string | null;
  profile_image: string | null;
  status: string;
}
