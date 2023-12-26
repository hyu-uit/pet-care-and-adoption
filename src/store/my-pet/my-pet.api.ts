import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { AddMyPetREQ } from './request/add-my-pet.request';

export const myPetApi = createApi({
  reducerPath: 'myPet',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/MyPet/`,
  }),
  tagTypes: ['MY_PET'],
  endpoints: (build) => ({
    addMyPet: build.mutation<void, AddMyPetREQ>({
      query: (body) => ({
        url: '/AddPet',
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: () => {
        return [{ type: 'MY_PET', id: 'LIST' }];
      },
    }),
    getMyPets: build.query<AddMyPetREQ, void>({
      query: () => ({
        url: '',
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: AddMyPetREQ) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'MY_PET', id: 'LIST' }];
      },
    }),
  }),
});

export const { useAddMyPetMutation, useGetMyPetsQuery } = myPetApi;
