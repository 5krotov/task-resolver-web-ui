export type ErrorMessages<T> = Partial<Record<keyof T, string>>;

export interface Form<T extends object> {
  fields: T;
  errorMessages: ErrorMessages<T>;
  sending: boolean;
  error: Error | null;
}
