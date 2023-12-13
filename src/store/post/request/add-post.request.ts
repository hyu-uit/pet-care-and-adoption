export type AddPostREQ = {
  postModel: {
    petName: string;
    sex: string;
    species: string;
    breed: string;
    weight: string;
    district: string;
    province: string;
    description: string;
    isVaccinated: boolean;
    isAdopt: boolean;
    userID: string;
  };
  images: { image: string }[];
};
