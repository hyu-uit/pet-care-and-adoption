import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';

export const provinceApi = createApi({
  reducerPath: 'province',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://provinces.open-api.vn/api/`,
  }),
  endpoints: (build) => ({
    getProvinces: build.query<void, void>({
      query: () => ({
        url: '',
        method: HTTP_METHOD.GET,
      }),
    }),
    getDistrict: build.query<void, number>({
      query: (body) => ({
        url: `p/${body}?depth=2`,
        method: HTTP_METHOD.GET,
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
  useLazyGetProvincesQuery,
} = provinceApi;
