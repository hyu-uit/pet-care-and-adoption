import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddFavoriteREQ } from './request/add-favorite.request';
import { GetFavoritePostsRESP } from './response/favorite-post.response';
import { RemoveFavoriteREQ } from './request/remove-favorite.request';
import { postApi } from '../post/post.api';
import { useDispatch } from 'react-redux';

export const favoritePostApi = createApi({
  reducerPath: 'favorite',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/FavoritePost/`,
  }),
  tagTypes: ['FAVORITE'],
  endpoints: (build) => ({
    addFavorite: build.mutation<void, AddFavoriteREQ>({
      query: (body) => ({
        url: '/AddFavorite',
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: () => {
        return [{ type: 'FAVORITE', id: 'LIST' }];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(postApi.util.invalidateTags([{ type: 'POST', id: 'LIST' }]));
      },
    }),
    getFavoritePosts: build.query<GetFavoritePostsRESP[], string>({
      query: (body) => ({
        url: `GetAllFavoritePosts/${body}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: GetFavoritePostsRESP[]) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'FAVORITE', id: 'LIST' }];
      },
    }),
    removeFavorite: build.mutation<void, RemoveFavoriteREQ>({
      query: (body) => ({
        url: `/RemoveFavorite/${body.userID}/${body.postID}`,
        method: HTTP_METHOD.DELETE,
        body,
        responseHandler: 'text',
      }),
      invalidatesTags: () => {
        return [{ type: 'FAVORITE', id: 'LIST' }];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(postApi.util.invalidateTags([{ type: 'POST', id: 'LIST' }]));
      },
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useGetFavoritePostsQuery,
  useLazyGetFavoritePostsQuery,
  useRemoveFavoriteMutation,
} = favoritePostApi;
