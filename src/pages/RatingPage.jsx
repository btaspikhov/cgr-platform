import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Card, CardContent,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, TextField,
  InputAdornment, Select, MenuItem, FormControl,
  InputLabel, Avatar
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const companies = [
  { rank: 1,  name: 'АО «Казатомпром»',         industry: 'Добыча',    rating: 9, score: 94, verified: true  },
  { rank: 2,  name: 'АО «Самрук-Казына»',        industry: 'Холдинг',   rating: 8, score: 88, verified: true  },
  { rank: 3,  name: 'АО «Казмунайгаз»',          industry: 'Нефтегаз',  rating: 8, score: 85, verified: true  },
  { rank: 4,  name: 'АО «Байтерек»',             industry: 'Финансы',   rating: 7, score: 79, verified: true  },
  { rank: 5,  name: 'АО «Halyk Bank»',           industry: 'Банки',     rating: 7, score: 76, verified: false },
  { rank: 6,  name: 'АО «Казтелеком»',           industry: 'Телеком',   rating: 6, score: 71, verified: false },
  { rank: 7,  name: 'АО «Air Astana»',           industry: 'Транспорт', rating: 6, score: 68, verified: true  },
  { rank: 8,  name: 'ТОО «Qarmet»',              industry: 'Металлургия',rating: 5, score: 62, verified: false },
  { rank: 9,  name: 'АО «Казпочта»',             industry: 'Услуги',    rating: 5, score: 58, verified: false },
  { rank: 10, name: 'АО «QazaqGaz»',             industry: 'Нефтегаз',  rating: 4, score: 51, verified: false },
]

function getRatingColor(r) {
  if (r >= 8) return '#059669'
  if (r >= 6) return '#2563EB'
  if (r >= 4) return '#D97706'
  return '#DC2626'
}

function getMedal(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return rank
}

export default function RatingPage() {
  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
            Публичный рейтинг компаний
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Рейтинг KZ-CGR по уровню корпоративного управления · 2024
          </Typography>
        </Box>

        {/* Stats row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {[
            { label: 'Компаний в реестре', value: '10' },
            { label: 'Верифицировано экспертами', value: '5' },
            { label: 'Средний рейтинг', value: '6.5' },
            { label: 'Период оценки', value: '2024' },
          ].map(({ label, value }) => (
            <Card key={label} sx={{ borderRadius: 2, flex: 1, minWidth: 160 }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" fontWeight={800} color="primary">
                  {value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="Поиск компании..."
            size="small" sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Отрасль</InputLabel>
            <Select label="Отрасль" defaultValue="all">
              <MenuItem value="all">Все отрасли</MenuItem>
              <MenuItem value="oil">Нефтегаз</MenuItem>
              <MenuItem value="finance">Финансы</MenuItem>
              <MenuItem value="telecom">Телеком</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Год</InputLabel>
            <Select label="Год" defaultValue="2024">
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1B3568' }}>
                {['Место', 'Компания', 'Отрасль', 'Рейтинг KZ-CGR', 'Балл', 'Статус'].map(h => (
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((c, i) => (
                <TableRow key={c.rank}
                  sx={{ bgcolor: i % 2 === 0 ? 'white' : '#F8FAFF',
                    '&:hover': { bgcolor: '#EFF6FF', cursor: 'pointer' } }}>
                  <TableCell>
                    <Typography fontWeight={700} fontSize={18}>
                      {getMedal(c.rank)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{c.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={c.industry} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{
                        width: 36, height: 36, fontSize: 14, fontWeight: 800,
                        bgcolor: getRatingColor(c.rating)
                      }}>
                        {c.rating}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        из 10
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{c.score}%</Typography>
                  </TableCell>
                  <TableCell>
                    {c.verified
                      ? <Chip label="✓ Верифицировано" color="success" size="small" />
                      : <Chip label="Самооценка" size="small" variant="outlined" />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </Box>
  )
}