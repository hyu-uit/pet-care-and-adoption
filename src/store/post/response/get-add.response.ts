import { SEX } from '../../../types/enum/sex.enum';

export type Post = {
  postID: string;
  petName: string;
  sex: SEX;
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
};

export type GetPostsRESP = Post[];
