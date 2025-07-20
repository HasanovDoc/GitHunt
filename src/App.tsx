import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { RepoSearch } from './components/RepoSearch';
import { PATInput } from './components/PatInput';
import './App.css';

function App() {
  const [pat, setPat] = useState(localStorage.getItem('github_pat') || '');
  const [open, setOpen] = useState(!import.meta.env.VITE_GITHUB_TOKEN && !pat);

  const handleTokenChange = (newPat: string) => {
    setPat(newPat);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // if (open) {
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <PATInput 
  //         onTokenChange={handleTokenChange} 
  //         onClose={handleClose}
  //       />
  //     </ThemeProvider>
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <RepoSearch />
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