import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, Divider, ToggleButtonGroup, ToggleButton, Typography
} from '@mui/material'
import { useRole } from '../contexts/RoleContext'

const allNavItems = [
  { path: '/company-profile', roles: ['company'] },
  { path: '/questionnaire',   roles: ['company'] },
  { path: '/experts',         roles: ['company', 'nsku'] },
  { path: '/rating',          roles: ['company', 'nsku', 'public'] },
  { path: '/roadmap',         roles: ['company', 'nsku'] },
  { path: '/reports',         roles: ['company', 'nsku'] },
]

const roleTabs = [
  { key: 'company', label: 'Компания' },
  { key: 'nsku',    label: 'НСКУ'     },
  { key: 'public',  label: 'Публично' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, setRole } = useRole()

  const handleRoleChange = (_, newRole) => {
    if (!newRole) return
    setRole(newRole)
    const stillVisible = allNavItems
      .filter(i => i.roles.includes(newRole))
      .some(i => i.path === location.pathname)
    if (!stillVisible) {
      const first = allNavItems.find(i => i.roles.includes(newRole))
      if (first) navigate(first.path)
    }
  }

  return (
    <Box sx={{
      width: 160,
      flexShrink: 0,
      borderRight: '1px solid #E2E8F0',
      bgcolor: 'white',
      pt: 2,
      px: 1.5,
    }}>
      <Typography variant="caption" color="text.disabled" sx={{ px: 1, mb: 1, display: 'block' }}>
        Режим просмотра
      </Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={role}
        exclusive
        onChange={handleRoleChange}
        fullWidth
        sx={{
          '& .MuiToggleButton-root': {
            border: '1px solid #E2E8F0',
            borderRadius: '8px !important',
            mb: 0.5,
            justifyContent: 'flex-start',
            px: 2,
            py: 0.75,
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': { bgcolor: '#F8FAFF', color: 'primary.main' },
            '&.Mui-selected': {
              bgcolor: '#1B3568',
              color: 'white',
              fontWeight: 700,
              borderColor: '#1B3568',
              '&:hover': { bgcolor: '#1B3568' },
            },
          },
        }}
      >
        {roleTabs.map(r => (
          <ToggleButton key={r.key} value={r.key}>
            {r.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}
