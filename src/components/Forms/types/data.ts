export interface IUserCreate {
  email: string;
  password: string;
  fullName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type IError = {
  status: string,
  data: IErrorValidation[]
}

interface IErrorValidation {
  location?: string;
  msg: string;
  param?: string;
  value?: string;
}
