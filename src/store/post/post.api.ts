import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddPostREQ } from './request/add-post.request';
import { AddPostRESP } from './response/add-post.response';
import { GetPostsRESP } from './response/get-add.response';
import { GetPostDetailRESP } from './response/get-post-detail.response';

export const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/Post`,
  }),
  endpoints: (build) => ({
    addPost: build.mutation<AddPostRESP, AddPostREQ>({
      query: (body) => ({
        url: '/AddPost',
        method: HTTP_METHOD.POST,
        body,
      }),
    }),

    getPosts: build.query<GetPostsRESP, void>({
      query: () => ({
        url: '',
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: GetPostsRESP) => {
        console.log('dcmmmmm');
        return {
          postAdoptModel: response.postAdoptModel,
          images: response.images,
        };
      },
    }),

    getPostDetail: build.query<GetPostDetailRESP, string>({
      query: (body) => ({
        url: `/GetByID${body}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: GetPostDetailRESP) => {
        console.log('resne', response);
        return response;
      },
    }),
  }),
});

export const { useAddPostMutation, useGetPostsQuery, useGetPostDetailQuery } =
  postApi;
