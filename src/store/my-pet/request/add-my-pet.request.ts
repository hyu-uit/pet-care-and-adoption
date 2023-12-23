export type AddMyPetREQ = {
  petModel: {
    petName: string;
    sex: string;
    age: number;
    species: string;
    breed: string;
    weight: string;
    description: string;
    userID: string;
  };
  images: {
    image: string;
  }[];
  history: {
    date: string;
    note: string;
  }[];
  next: {
    date: string;
    note: string;
  }[];
};
