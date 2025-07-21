// import { useState } from 'react';
// import { useSearchReposQuery } from '../api/githubApi';
import type { SearchResult } from '../types/types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Link,
} from '@mui/material';
// import { SearchHeader } from './SearchHeader';
// import { themes } from './themes';

/** 
 * Компонент для поиска репозиториев GitHub.
 * @feature Использует RTK Query для запросов к GraphQL API.
 */
export const RepoSearch = ({data, error}: {data: SearchResult, error: object}) => {
  // const [query, setQuery] = useState('');  
  // const { data, error } = useSearchReposQuery(query, {
  //   skip: !query
  // });

  // const handleSearch = (searchQuery: string) => { 
  //   setQuery(searchQuery);
  // };

  return (
    <Box sx={{ 
      maxWidth: '100 vw', 
      margin: '0 auto', 
      p: 3,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Поиск репозиториев GitHub
      </Typography>

      {/* <Box sx={{ mb: 3 }}>
        <SearchHeader 
          onSearch={handleSearch} 
          onThemeToggle={toggleTheme}
        />
      </Box> */}

      {error && (
        <Typography color="error">
          Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </Typography>
      )}

      <List sx={{ bgcolor: 'background.paper' }}>
        {data?.data?.search.edges.map(({ node }, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={
                <Link href={node.url} target="_blank" rel="noopener" sx={{ color: 'primary.main' }}>
                  {node.name}
                </Link>
              }
              secondary={`⭐ ${node.stargazerCount} stars`}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};