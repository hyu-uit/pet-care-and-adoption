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
    getMyPets: build.query<AddMyPetREQ[], void>({
      query: () => ({
        url: '',
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: AddMyPetREQ[]) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'MY_PET', id: 'LIST' }];
      },
    }),

    deleteMyPet: build.mutation<void, { userID: string; petID: string }>({
      query: (body) => ({
        url: `/RemovePet/${body.userID}/${body.petID}`,
        method: HTTP_METHOD.DELETE,
        body,
        responseHandler: 'text',
      }),
      invalidatesTags: () => {
        return [{ type: 'MY_PET', id: 'LIST' }];
      },
    }),

    updateMyPet: build.mutation<void, { petID: string; data: AddMyPetREQ }>({
      query: (body) => ({
        url: `/UpdatePet/${body.petID}`,
        method: HTTP_METHOD.PUT,
        body: body.data,
        responseHandler: 'text',
      }),
      invalidatesTags: () => {
        return [{ type: 'MY_PET', id: 'LIST' }];
      },
    }),
  }),
});

export const {
  useAddMyPetMutation,
  useGetMyPetsQuery,
  useDeleteMyPetMutation,
  useUpdateMyPetMutation,
} = myPetApi;
