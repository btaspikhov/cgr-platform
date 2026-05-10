import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button,
  Typography, InputAdornment, IconButton, Alert
} from '@mui/material'
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material'

export default function LoginPage() {
  const navigate = useNavigate()
  const [bin, setBin] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (bin.length < 3 || password.length < 3) {
      setError('Введите БИН и пароль')
      return
    }
    navigate('/questionnaire')
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1B3568 0%, #2563EB 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Card sx={{ width: 420, borderRadius: 3, boxShadow: 8 }}>
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: 'primary.main', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <LockOutlined sx={{ color: 'white', fontSize: 28 }} />
            </Box>
          </Box>

          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
            CGR Platform
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={4}>
            Оценка корпоративного управления РК
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth label="БИН организации" value={bin}
            onChange={e => setBin(e.target.value)}
            sx={{ mb: 2 }} variant="outlined"
            inputProps={{ maxLength: 12 }}
          />
          <TextField
            fullWidth label="Пароль" value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPass ? 'text' : 'password'}
            sx={{ mb: 3 }} variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            fullWidth variant="contained" size="large"
            onClick={handleLogin}
            sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
          >
            Войти
          </Button>

          <Typography variant="caption" color="text.secondary"
            display="block" align="center" mt={3}>
            Национальный совет по КУ · НПП РК «Атамекен»
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}