import { themes } from '../styles/theme';

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

type ThemeKeys = keyof typeof themes;

/** Тип для пропсов у input */
export interface SearchHeaderProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialValue?: string;
  onThemeToggle: (themeName: ThemeKeys) => void;
  currentTheme: "navy" | "light" | "dark" | undefined;
}