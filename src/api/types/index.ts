export * from "./common";

export interface CustomResponse {
  readonly status: boolean;
  readonly message: string;
  readonly data: any;
  readonly origin?: any;
}
