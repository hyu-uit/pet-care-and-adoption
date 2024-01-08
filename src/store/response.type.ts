import { PagingRESP } from './paging.type';

export type BaseResponse<T> = {
  data: T;
  message: string;
};

export type PaginationRESP<T> = {
  data: T[];
  status: string;
} & PagingRESP;
