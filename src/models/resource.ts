export interface Resource<T, P> {
  params: P;
  data: T | null;
  loading: boolean;
  error: Error | null;
}
