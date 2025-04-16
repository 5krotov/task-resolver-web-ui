"use server";

export type HttpTasksRepositoryConfig = {
  baseUrl: string;
};

export async function fetchConfig() {
  "use server";
  return {
    baseUrl: process.env.BASE_REST_API_URL ?? "",
  };
}
