import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { store } from '../../store';
// import { resetState } from '../../store/shared/shared.slice';
interface EntityError {
  data: {
    code: string;
    message: string;
    errors: { [key: string]: string };
  };
}

interface ConflictError {}

interface BadRequestError {
  message: string;
}

interface UnauthorizedError {
  message: string;
}

export function isFetchBaseQueryError(
  error: any
): error is FetchBaseQueryError {
  return (
    error !== null &&
    error.data !== null &&
    typeof error.data === 'object' &&
    'message' in error.data
  );
}

export function isEntityError(error: unknown): error is EntityError {
  return error.data?.status === 422;
}

export function isBadRequestError(error: unknown): error is BadRequestError {
  return error.data?.status === 400;
}

export function isUnauthorizedError(
  error: unknown
): error is UnauthorizedError {
  return error.data?.status === 401;
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

export const onResponseUnauthorized = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const response = await fetch(input, init);
  if (response.status === 401) {
    // store.dispatch(resetState());
  }
  return response;
};

export const prepareTokenHeader = (headers: Headers) => {
  const state = store.getState();
  const token = state.shared.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export const invalidateByResultId = <T extends { id: string | number }>(
  TYPE: string,
  result: T
) => {
  if (result)
    return [
      { type: TYPE, id: result.id },
      { type: TYPE, id: 'LIST' },
    ];
  return [];
};

export const invalidateById = (
  TYPE: string,
  result: any,
  id: string | number
) => {
  if (result)
    return [
      { type: TYPE, id },
      { type: TYPE, id: 'LIST' },
    ];
  return [];
};

export const invalidateAll = (TYPE: string, result: any) => {
  // if (result) return [{ type: TYPE, id: 'LIST' }];
  // return [];
  return [{ type: TYPE, id: 'LIST' }];
};
