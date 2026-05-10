import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Box, Button, Typography,
  IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, Divider
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const navItems = [
  { label: 'Самооценка КУ',  path: '/questionnaire', key: 'assessment' },
  { label: 'Оценка СД',      path: '/questionnaire', key: 'board' },
  { label: 'Эксперты',       path: '/experts',        key: 'experts' },
  { label: 'Рейтинг',        path: '/rating',         key: 'rating' },
  { label: 'Дорожная карта', path: '/roadmap',        key: 'roadmap' },
  { label: 'Отчёты',         path: '/reports',        key: 'reports' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(
    navItems.find(i => i.path === location.pathname)?.key || 'assessment'
  )

  const handleNav = (item) => {
    setActiveKey(item.key)
    navigate(item.path)
    setDrawerOpen(false)
  }

  return (
    <>
      <AppBar position="sticky" elevation={0}
        sx={{ bgcolor: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <Toolbar sx={{ gap: 1 }}>

          {/* Logo */}
          <Typography
            variant="h6" fontWeight={800} color="primary"
            sx={{ cursor: 'pointer', mr: 3, letterSpacing: -0.5 }}
            onClick={() => handleNav(navItems[0])}
          >
            CGR Platform
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flex: 1 }}>
            {navItems.map(item => (
              <Button
                key={item.key}
                onClick={() => handleNav(item)}
                sx={{
                  color: activeKey === item.key
                    ? 'primary.main' : 'text.secondary',
                  fontWeight: activeKey === item.key ? 700 : 400,
                  borderBottom: activeKey === item.key
                    ? '2px solid' : '2px solid transparent',
                  borderRadius: 0,
                  px: 1.5,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Exit button */}
          <Button
            variant="outlined" size="small"
            onClick={() => navigate('/')}
            sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
          >
            Выйти
          </Button>

          {/* Mobile burger */}
          <IconButton
            sx={{ ml: 'auto', display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Typography variant="h6" fontWeight={800}
            color="primary" sx={{ px: 2, mb: 1 }}>
            CGR Platform
          </Typography>
          <Divider />
          <List>
            {navItems.map(item => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={activeKey === item.key}
                  onClick={() => handleNav(item)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button fullWidth variant="outlined"
              onClick={() => { navigate('/'); setDrawerOpen(false) }}>
              Выйти
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}