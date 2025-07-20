import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchResult } from '../types/types'

/** 
 * GitHub GraphQL API для поиска репозиториев.
 * @baseUrl https://api.github.com/graphql
 * @headers Авторизация через Personal Access Token (PAT).
 */
export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    prepareHeaders: (headers) => {   
      const pat = localStorage.getItem('github_pat');
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_GITHUB_TOKEN || pat}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchRepos: builder.query<SearchResult, string>({
      /** 
       * @param {string} query - Поисковый запрос.
       * @returns {Promise<SearchResult>} Ответ.
       */
      query: (query) => ({
        url: '/graphql',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query SearchRepos($query: String!) {
              search(query: $query, type: REPOSITORY, first: 10) {
                edges {
                  node {
                    ... on Repository {
                      name
                      url
                      stargazerCount
                    }
                  }
                }
              }
            }
          `,
          variables: { query },
        }),
      }),
    }),
  }),
});

export const { useSearchReposQuery } = githubApi;

// /** Тип для ответа GraphQL. */
// interface SearchResult {
//   data?: {
//     search: {
//       edges: Array<{
//         node: {
//           name: string;
//           url: string;
//           stargazerCount: number;
//         };
//       }>;
//     };
//   };
//   error?: unknown;
// }