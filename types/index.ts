export type paginationType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type formValues = {
  name: string;
  job: string;
};
