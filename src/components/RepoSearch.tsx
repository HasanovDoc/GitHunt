import { useState } from 'react';
import { useSearchReposQuery } from '../api/githubApi';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  Link,
} from '@mui/material';

/** 
 * Компонент для поиска репозиториев GitHub.
 * @feature Использует RTK Query для запросов к GraphQL API.
 */
export const RepoSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');  

  

  const { data, error, isLoading } = useSearchReposQuery(query, {
      skip: !query
    }
  );
  console.log(error);

  const handleSearch = () => { 
    setQuery(searchQuery);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Поиск репозиториев GitHub
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Введите запрос"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Найти'}
        </Button>
      </Box>

      {error && (
        <Typography color="error">
          Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </Typography>
      )}

      <List>
        {data?.data?.search.edges.map(({ node }, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={
                <Link href={node.url} target="_blank" rel="noopener">
                  {node.name}
                </Link>
              }
              secondary={`⭐ ${node.stargazerCount} stars`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};