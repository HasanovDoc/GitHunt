import { TextField, Button } from '@mui/material';
// import { useRepos } from '../api/githubApi';
import { useState } from 'react'

/** 
 * Компонент поиска репозиториев.
 * @prop {function} onSearch - Коллбэк при отправке запроса.
 */
export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <div>
      <TextField 
        label="Поиск репозиториев" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={() => onSearch(query)}>Найти</Button>
    </div>
  );
}