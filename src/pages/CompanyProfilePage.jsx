import { useState } from 'react'
import {
  Box, Container, Typography, Card, CardContent,
  Grid, TextField, Select, MenuItem, FormControl,
  InputLabel, Chip, Divider, Button
} from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'

const defaultProfile = {
  name: 'АО «KazIndustry Development»',
  bin: '240540001234',
  industry: 'Энергетика',
  region: 'Астана',
  size: 'Малая компания',
  year: '2026',
}

const industries = ['Энергетика', 'Нефтегаз', 'Финансы', 'Банки', 'Телеком', 'Транспорт', 'Металлургия', 'Добыча', 'Холдинг', 'Услуги', 'Другое']
const regions = ['Астана', 'Алматы', 'Шымкент', 'Актобе', 'Атырау', 'Павлодар', 'Усть-Каменогорск', 'Другой']
const sizes = ['Малая компания', 'Средняя компания', 'Крупная компания']
const years = ['2024', '2025', '2026']

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState(defaultProfile)
  const [saved, setSaved] = useState(false)

  const handle = (field) => (e) => {
    setProfile(p => ({ ...p, [field]: e.target.value }))
    setSaved(false)
  }

  const handleSave = () => setSaved(true)

  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="overline" color="text.disabled" letterSpacing={1.5} fontSize={11}>
              Клиентский прототип без серверной части
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
              <BusinessIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h4" fontWeight={800} color="text.primary">
                Профиль компании
              </Typography>
            </Box>
          </Box>

          {/* Rating badge */}
          <Card sx={{ borderRadius: 2, boxShadow: 2, minWidth: 160, textAlign: 'right' }}>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Typography variant="overline" color="text.disabled" fontSize={10}>
                Рейтинг
              </Typography>
              <Typography variant="h3" fontWeight={900} color="error.main" lineHeight={1}>
                14
              </Typography>
              <Typography variant="caption" color="text.secondary">
                D · Требуется развитие КУ
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Grid container spacing={3}>

          {/* Left: company form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ p: 3 }}>

                {/* Card header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={600} letterSpacing={0.5}>
                    Данные компании
                  </Typography>
                  <Chip
                    label={saved ? '✓ Сохранено' : 'Черновик'}
                    size="small"
                    color={saved ? 'success' : 'default'}
                    variant={saved ? 'filled' : 'outlined'}
                  />
                </Box>

                <Grid container spacing={2.5}>
                  {/* Row 1 */}
                  <Grid item xs={12} sm={7}>
                    <TextField
                      label="Наименование"
                      fullWidth
                      value={profile.name}
                      onChange={handle('name')}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="БИН"
                      fullWidth
                      value={profile.bin}
                      onChange={handle('bin')}
                      size="small"
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>

                  {/* Row 2 */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Отрасль</InputLabel>
                      <Select label="Отрасль" value={profile.industry} onChange={handle('industry')}>
                        {industries.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Регион</InputLabel>
                      <Select label="Регион" value={profile.region} onChange={handle('region')}>
                        {regions.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Row 3 */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Размер</InputLabel>
                      <Select label="Размер" value={profile.size} onChange={handle('size')}>
                        {sizes.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Отчетный год</InputLabel>
                      <Select label="Отчетный год" value={profile.year} onChange={handle('year')}>
                        {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 1.5 }}>
                  <Button variant="contained" size="small" sx={{ borderRadius: 2 }} onClick={handleSave}>
                    Сохранить
                  </Button>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                    Сбросить
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: rating summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="text.disabled" fontSize={11} letterSpacing={1.5}>
                  Сводка оценки
                </Typography>

                <Typography variant="h2" fontWeight={900} color="error.main" mt={1} lineHeight={1}>
                  14
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={2} mb={2}>
                  Предварительный рейтинг рассчитывается на демонстрационной формуле и будет заменен после
                  утверждения методологии KZ-CGR.
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {[
                  { label: 'Статус анкеты', value: saved ? 'Сохранено' : 'Черновик' },
                  { label: 'Хранение',      value: 'localStorage' },
                  { label: 'Серверная часть', value: 'Не используется' },
                ].map(({ label, value }) => (
                  <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                    <Typography variant="body2" fontWeight={700} color="text.primary">{value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </Box>
  )
}
