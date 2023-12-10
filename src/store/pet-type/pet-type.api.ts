import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { PetTypeSpeciesRESP } from './response/pet-type-species.response';
import { PetTypeBreedsRESP } from './response/pet-type-breeds.response';

export const petTypeApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/PetType/`,
  }),
  endpoints: (build) => ({
    getSpecies: build.query<PetTypeSpeciesRESP, void>({
      query: (body) => ({
        url: `Species`,
        method: HTTP_METHOD.GET,
      }),
    }),
    getBreeds: build.query<PetTypeBreedsRESP, void>({
      query: (body) => ({
        url: `Breeds`,
        method: HTTP_METHOD.GET,
      }),
    }),
  }),
});

export const { useGetSpeciesQuery, useGetBreedsQuery } = petTypeApi;
