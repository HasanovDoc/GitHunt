import { useState } from 'react';
import { RepoSearch } from './components/RepoSearch';
import { PATInput } from './components/PATInput';
import { ThemeProvider } from '@mui/material';
import { themes } from './styles/theme';
import { CssBaseline } from '@mui/material';
import './App.css';
import { SearchHeader } from './components/SearchHeader';
import { useSearchReposQuery } from './api/githubApi';

function App() {
  const [pat, setPat] = useState(localStorage.getItem('github_pat') || '');
  const [open, setOpen] = useState(!import.meta.env.VITE_GITHUB_TOKEN && !pat);
  const [themeName, setThemeName] = useState<keyof typeof themes>('navy');
  const [query, setQuery] = useState(''); 

  const handleTokenChange = (newPat: string) => {
    setPat(newPat);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeToggle = (newTheme: keyof typeof themes) => {
    setThemeName(newTheme);
  };

  const { data, error } = useSearchReposQuery(query, {
    skip: !query
  });

  const handleSearch = (searchQuery: string) => { 
    setQuery(searchQuery);
  };

  return (
    <ThemeProvider theme={themes[themeName]}>
      <CssBaseline />
      <SearchHeader 
        onSearch={handleSearch}
        onThemeToggle={handleThemeToggle}
        currentTheme={themeName}
      />
      {data? <RepoSearch data={data} error={error!} />: ''}
      {
        open? 
        <PATInput 
          onTokenChange={handleTokenChange} 
          onClose={handleClose}
        /> 
        : ''
      }
    </ThemeProvider>
  );
}

export default App;