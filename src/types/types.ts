/** Тип для ответа GraphQL. */
export interface SearchResult {
  data?: {
    search: {
      edges: Array<{
        node: {
          name: string;
          url: string;
          stargazerCount: number;
        };
      }>;
    };
  };
  error?: unknown;
}