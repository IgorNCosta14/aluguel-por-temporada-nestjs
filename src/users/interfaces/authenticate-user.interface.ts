export interface IRequest {
  password: string;
  email: string;
}

export interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
