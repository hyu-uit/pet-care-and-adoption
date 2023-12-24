import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddPostREQ } from './request/add-post.request';
import { AddPostRESP } from './response/add-post.response';
import { GetPostsRESP } from './response/get-add.response';
import { GetPostDetailRESP } from './response/get-post-detail.response';
import { RequestAdoptionREQ } from './request/request-adoption.request';
import { getAllPostsWithUserRESP } from './response/get-all-posts.response';
import { getReuqestedPostsRESP } from './response/get-requested-posts.response';
import { cancelRequestREQ } from './request/cancel-request.request';

export const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/Post`,
  }),
  tagTypes: ['POST', 'REQUEST'],
  endpoints: (build) => ({
    addPost: build.mutation<AddPostRESP, AddPostREQ>({
      query: (body) => ({
        url: '/AddPost',
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: () => {
        return [{ type: 'POST', id: 'LIST' }];
      },
    }),

    getPosts: build.query<GetPostsRESP, void>({
      query: () => ({
        url: '',
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: GetPostsRESP) => {
        console.log('res ne', response);
        return response;
      },
      providesTags: () => {
        return [
          { type: 'POST', id: 'LIST' },
          { type: 'REQUEST', id: 'LIST' },
        ];
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

    requestAdoption: build.mutation<void, RequestAdoptionREQ>({
      query: (body) => ({
        url: `/RequestAdoption?postID=${body.postID}&userRequest=${body.userRequest}`,
        method: HTTP_METHOD.POST,
        responseHandler: 'text',
      }),
      transformErrorResponse: (response) => {
        console.log('ressssss', response);
      },
      invalidatesTags: () => {
        return [{ type: 'REQUEST', id: 'LIST' }];
      },
    }),

    getAllPostsWithUser: build.query<getAllPostsWithUserRESP[], string>({
      query: (body) => ({
        url: `GetAllPostsWithUser?userID=${body}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: getAllPostsWithUserRESP[]) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'REQUEST', id: 'LIST' }];
      },
    }),

    getRequestedPosts: build.query<getReuqestedPostsRESP[], string>({
      query: (body) => ({
        url: `GetRequestPosts?userID=${body}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: getReuqestedPostsRESP[]) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'REQUEST', id: 'LIST' }];
      },
    }),

    cancelRequest: build.mutation<void, cancelRequestREQ>({
      query: (body) => ({
        url: `/CancelRequest?postID=${body.postID}&userID=${body.userID}`,
        method: HTTP_METHOD.POST,
      }),
      invalidatesTags: () => {
        return [{ type: 'REQUEST', id: 'LIST' }];
      },
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useGetPostDetailQuery,
  useRequestAdoptionMutation,
  useGetAllPostsWithUserQuery,
  useGetRequestedPostsQuery,
  useCancelRequestMutation,
} = postApi;
