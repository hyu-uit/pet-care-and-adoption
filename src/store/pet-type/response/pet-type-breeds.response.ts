type PetTypeBreed = {
  breedID: string;
  speciesID: string;
  breedName: string;
};

export type PetTypeBreedsRESP = {
  data: PetTypeBreed[];
};
