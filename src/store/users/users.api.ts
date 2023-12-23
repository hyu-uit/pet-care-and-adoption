import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { UserInformation } from './response/users.response';
import { EditInformationREQ } from './request/edit-info.request';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/Users/`,
  }),
  endpoints: (build) => ({
    getUserInformation: build.query<UserInformation, string>({
      query: (body) => ({
        url: `${body}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: UserInformation) => {
        return response;
      },
    }),
    editInformation: build.mutation<void, EditInformationREQ>({
      query: (body) => ({
        url: `${body.userID}`,
        body: body,
        method: HTTP_METHOD.PUT,
      }),
    }),
  }),
});

export const { useGetUserInformationQuery, useEditInformationMutation } =
  usersApi;
