import {
  Box, Container, Typography, Card, CardContent,
  Avatar, Chip, Button, Rating, TextField,
  InputAdornment, Grid, Divider
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VerifiedIcon from '@mui/icons-material/Verified'
import StarIcon from '@mui/icons-material/Star'

const experts = [
  {
    id: 1,
    name: 'Сейткали Марат Ержанович',
    title: 'Независимый директор, сертифицированный эксперт КУ',
    specialization: ['Совет директоров', 'Комплаенс', 'Госсектор'],
    rating: 4.9,
    reviews: 24,
    assessments: 47,
    price: '350 000 ₸',
    badge: 'Топ-10',
    available: true,
  },
  {
    id: 2,
    name: 'Нурланова Айгуль Болатовна',
    title: 'Корпоративный секретарь, эксперт по раскрытию информации',
    specialization: ['Раскрытие информации', 'АО', 'Финансы'],
    rating: 4.8,
    reviews: 18,
    assessments: 31,
    price: '280 000 ₸',
    badge: 'Сертифицированный',
    available: true,
  },
  {
    id: 3,
    name: 'Джаксыбеков Тимур Алибекович',
    title: 'Эксперт по корпоративному праву и управлению рисками',
    specialization: ['Риски', 'Нефтегаз', 'Квазигоссектор'],
    rating: 4.7,
    reviews: 31,
    assessments: 58,
    price: '420 000 ₸',
    badge: 'Топ-10',
    available: false,
  },
  {
    id: 4,
    name: 'Ким Светлана Владимировна',
    title: 'Аудитор, специалист по внутреннему контролю',
    specialization: ['Внутренний аудит', 'Банки', 'ESG'],
    rating: 4.6,
    reviews: 12,
    assessments: 19,
    price: '250 000 ₸',
    badge: 'Сертифицированный',
    available: true,
  },
]

function getBadgeColor(badge) {
  if (badge === 'Топ-10') return 'warning'
  return 'primary'
}

export default function ExpertsPage() {
  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Маркетплейс независимых экспертов
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Аккредитованные эксперты по корпоративному управлению РК
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {[
            { label: 'Аккредитованных экспертов', value: '4' },
            { label: 'Проведено оценок', value: '155' },
            { label: 'Средний рейтинг', value: '4.8' },
            { label: 'Срок оценки', value: '5–10 дней' },
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

        {/* Search */}
        <TextField
          fullWidth placeholder="Поиск по имени или специализации..."
          size="small" sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />

        {/* Expert cards */}
        <Grid container spacing={3}>
          {experts.map(expert => (
            <Grid item xs={12} md={6} key={expert.id}>
              <Card sx={{
                borderRadius: 2, height: '100%',
                border: '1px solid #E2E8F0',
                boxShadow: 2,
                '&:hover': { boxShadow: 6, cursor: 'pointer' }
              }}>
                <CardContent sx={{ p: 3 }}>

                  {/* Top row */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar sx={{
                      width: 56, height: 56, fontSize: 20,
                      fontWeight: 700, bgcolor: 'primary.main'
                    }}>
                      {expert.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight={700} variant="body1">
                          {expert.name}
                        </Typography>
                        <VerifiedIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {expert.title}
                      </Typography>
                    </Box>
                    <Chip
                      label={expert.badge}
                      color={getBadgeColor(expert.badge)}
                      size="small" icon={<StarIcon />}
                    />
                  </Box>

                  {/* Specialization */}
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {expert.specialization.map(s => (
                      <Chip key={s} label={s} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Stats */}
                  <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                    <Box>
                      <Rating value={expert.rating} precision={0.1}
                        readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">
                        {expert.rating} ({expert.reviews} отзывов)
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {expert.assessments}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        оценок проведено
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price and button */}
                  <Box sx={{ display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="primary">
                        {expert.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        за одну оценку
                      </Typography>
                    </Box>
                    <Button
                      variant={expert.available ? 'contained' : 'outlined'}
                      disabled={!expert.available}
                      sx={{ borderRadius: 2 }}
                    >
                      {expert.available ? 'Заказать оценку' : 'Недоступен'}
                    </Button>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  )
}