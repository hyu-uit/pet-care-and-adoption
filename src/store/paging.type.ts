export type PagingREQ = { page: number; size: number };
export type PagingRESP = { total: number };
export type PagingState = {
  page: number;
  size: number;
  count?: number;
  totalPage?: number;
  totalCount?: number;
};
export const initialPagingState: PagingREQ = { page: 1, size: 10 };
