import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddPostREQ } from './request/add-post.request';

export const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/Post/`,
  }),
  endpoints: (build) => ({
    addPost: build.mutation<void, AddPostREQ>({
      query: (body) => ({
        url: 'AddPost',
        method: HTTP_METHOD.POST,
        body,
      }),
    }),
  }),
});

export const { useAddPostMutation } = postApi;
