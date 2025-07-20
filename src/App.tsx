// import { useState } from 'react'
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { RepoSearch } from './components/RepoSearch';
import './App.css'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <RepoSearch />
    </ThemeProvider>
    </>
  )
}

export default App
