export type AuthorObject = {
  id: number;
  firstName: string;
  lastName: string;
  countryId: number;
};

export type BookObject = {
  title: string;
  author: number;
};

export type CountryObject = {
  id: number;
  name: string;
};
