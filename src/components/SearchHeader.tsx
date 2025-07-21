import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { 
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { SearchHeaderProps } from '../types/types';
import type { themes } from '../styles/theme';
import type { SelectChangeEvent } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchHeader = ({ 
  onSearch, 
  isLoading = false,
  initialValue = '',
  onThemeToggle,
  currentTheme
}: SearchHeaderProps & { onThemeToggle: (themeName: keyof typeof themes) => void }) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleThemeChange = (event: SelectChangeEvent<keyof typeof themes>) => {
    onThemeToggle(event.target.value as keyof typeof themes);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: '0 !important' }}>
          {/* Search section */}
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            mr: 2
          }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск репозиториев GitHub..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  '& .MuiInputBase-input::placeholder': {
                    color: (theme) => theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </Search>
            <IconButton
              onClick={handleSearchClick}
              disabled={isLoading || !searchValue.trim()}
              sx={{ 
                color: 'text.primary',
                ml: 1,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
                },
                '&:disabled': {
                  color: (theme) => theme.palette.text.disabled,
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Box>

          {/* Theme switcher */}
          <FormControl>
            <InputLabel>Тема</InputLabel>
            <Select
              value={currentTheme}
              onChange={handleThemeChange}
              label="Тема"
            >
              <MenuItem value="light">Светлая</MenuItem>
              <MenuItem value="dark">Тёмная</MenuItem>
              <MenuItem value="navy">Тёмно-синяя</MenuItem>
              {/* добавляй новые темы по желанию */}
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};