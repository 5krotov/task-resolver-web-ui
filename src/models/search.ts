export interface SearchPagination {
  page: number;
  perPage: number;
}

export interface Paginated<T> {
  pages: number;
  data: T;
}

export interface SearchSort<S> {
  sort: S;
  order: "asc" | "desc";
}
