import { SEX } from './enum/sex.enum';

export type AddPostType = {
  images: string[];
  name: string;
  sex: SEX;
  age: string;
  specie: string;
  breed: string;
  weight: string;
  province: string;
  district: string;
  isVaccinated: boolean;
  isAdopt: boolean;
  description: string;
};
