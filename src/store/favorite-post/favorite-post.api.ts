import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddFavoriteREQ } from './request/add-favorite.request';
import { GetFavoritePostsRESP } from './response/favorite-post.response';

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
  }),
});

export const {
  useAddFavoriteMutation,
  useGetFavoritePostsQuery,
  useLazyGetFavoritePostsQuery,
} = favoritePostApi;
