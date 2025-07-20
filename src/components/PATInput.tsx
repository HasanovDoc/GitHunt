import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  useTheme
} from '@mui/material';
import { GitHub, Close } from '@mui/icons-material';

export const PATInput = ({ 
  onTokenChange, 
  onClose 
}: { 
  onTokenChange: (token: string) => void,
  onClose: () => void 
}) => {
  const [token, setToken] = useState('');
  const theme = useTheme();

  const handleSubmit = () => {
    if (!token.trim()) return;
    localStorage.setItem('github_pat', token);
    onTokenChange(token);
  };

  return (
    <Dialog 
      open 
      fullScreen 
      PaperProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.178)',
          backdropFilter: 'blur(8px)',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: 400,
            position: 'relative',
            backgroundColor: 'rgb(30, 30, 30)',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.text.secondary
            }}
            onClick={onClose}
          >
            <Close />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <GitHub fontSize="large" color="primary" />
            <Typography variant="h5" sx={{ mt: 1 }}>
              Введите GitHub PAT
            </Typography>
          </Box>

          <TextField
            label="GitHub Personal Access Token"
            type="password"
            fullWidth
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_ВашТокен..."
            sx={{ mb: 3 }}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            size="large"
          >
            Подтвердить
          </Button>
        </Paper>
      </Box>
    </Dialog>
  );
};