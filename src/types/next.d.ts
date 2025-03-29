declare module 'next' {
  export interface PageProps<Params = Record<string, unknown>, SearchParams = Record<string, unknown>> {
    params: Params;
    searchParams?: SearchParams;
  }
} 