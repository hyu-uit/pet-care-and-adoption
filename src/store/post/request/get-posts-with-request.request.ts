import { SEX } from '../../../types/enum/sex.enum';

export type getPostsWithRequest = {
  postID: {
    postID: string;
    petName: string;
    sex: SEX;
    age: number;
    species: string;
    breed: string;
    weight: string;
    district: string;
    province: string;
    description: string;
    isVaccinated: boolean;
    isAdopt: boolean;
    isDone: boolean;
    userID: string;
    receiverID: string;
  };
  request: {
    userID: string;
    name: string;
    avatar: string;
  }[];
  images: string[];
};