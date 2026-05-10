import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Card, CardContent,
  Button, Chip, LinearProgress, Grid, Divider, List,
  ListItem, ListItemText, ListItemIcon, Paper, AppBar, Toolbar
} from '@mui/material'
import {
  CheckCircle, Cancel, Warning, Download,
  Refresh, EmojiEvents, TrendingUp
} from '@mui/icons-material'
import { questions } from '../data/questions'

function getRating(score) {
  if (score >= 90) return { value: 9, label: 'Отлично',      color: '#059669' }
  if (score >= 75) return { value: 7, label: 'Хорошо',       color: '#2563EB' }
  if (score >= 60) return { value: 6, label: 'Удовлетворительно', color: '#D97706' }
  if (score >= 40) return { value: 4, label: 'Ниже среднего', color: '#EA580C' }
  return              { value: 2, label: 'Критический',    color: '#DC2626' }
}

export default function ResultsPage() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const answers   = state?.answers || {}

  const yesCount  = Object.values(answers).filter(a => a.value === 'yes').length
  const noWithExp = Object.values(answers).filter(a => a.value === 'no' && a.explanation).length
  const noCount   = Object.values(answers).filter(a => a.value === 'no').length

  const score  = Math.round(((yesCount + noWithExp * 0.5) / questions.length) * 100)
  const rating = getRating(score)

  const violations = questions.filter(q =>
    answers[q.id]?.value === 'no'
  )

  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}
        sx={{ bgcolor: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ flex: 1 }}>
            CGR Platform · Результаты оценки
          </Typography>
          <Button variant="outlined" startIcon={<Refresh />}
            onClick={() => navigate('/questionnaire')} sx={{ mr: 1 }}>
            Пройти заново
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Скачать PDF
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>

        {/* Rating card */}
        <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
          <Box sx={{ bgcolor: rating.color, p: 4, color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{
                width: 96, height: 96, borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Typography variant="h3" fontWeight={900}>
                  {rating.value}
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  Рейтинг KZ-CGR
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {rating.label}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                  Блок 2: Совет директоров · 2024
                </Typography>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Итоговый балл: {score}%
            </Typography>
            <LinearProgress variant="determinate" value={score}
              sx={{ height: 10, borderRadius: 5,
                '& .MuiLinearProgress-bar': { bgcolor: rating.color } }} />
          </CardContent>
        </Card>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { icon: <CheckCircle color="success" />, label: 'Соблюдается',         value: yesCount,  sub: `× 1.0 балл` },
            { icon: <Warning color="warning" />,     label: 'Объяснено',           value: noWithExp, sub: `× 0.5 балла` },
            { icon: <Cancel color="error" />,        label: 'Не соблюдается',      value: noCount - noWithExp, sub: `× 0.0 баллов` },
            { icon: <EmojiEvents sx={{ color: rating.color }} />, label: 'Итоговый балл', value: `${score}%`, sub: rating.label },
          ].map(({ icon, label, value, sub }) => (
            <Grid item xs={6} sm={3} key={label}>
              <Card sx={{ borderRadius: 2, textAlign: 'center', p: 2 }}>
                {icon}
                <Typography variant="h5" fontWeight={700} mt={1}>{value}</Typography>
                <Typography variant="caption" color="text.secondary">{label}</Typography>
                <Typography variant="caption" display="block" color="text.disabled">{sub}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Violations */}
        {violations.length > 0 && (
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Дорожная карта улучшений
                </Typography>
                <Chip label={violations.length} color="error" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List disablePadding>
                {violations.map((q, i) => {
                  const ans = answers[q.id]
                  const hasExp = ans?.explanation?.trim()
                  return (
                    <ListItem key={q.id} alignItems="flex-start"
                      sx={{ px: 0, pb: 2, borderBottom: i < violations.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <ListItemIcon sx={{ mt: 0.5, minWidth: 36 }}>
                        {hasExp
                          ? <Warning sx={{ color: '#D97706', fontSize: 20 }} />
                          : <Cancel sx={{ color: '#DC2626', fontSize: 20 }} />
                        }
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                            <Chip label={q.code} size="small" variant="outlined"
                              color="primary" sx={{ fontFamily: 'monospace', fontSize: 10 }} />
                            <Typography variant="body2" fontWeight={600}>
                              {q.text}
                            </Typography>
                          </Box>
                        }
                        secondary={hasExp
                          ? <Typography variant="caption" color="text.secondary">
                              Объяснение: {ans.explanation}
                            </Typography>
                          : <Typography variant="caption" color="error">
                              Требует объяснения и плана устранения
                            </Typography>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        )}

        <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <Typography variant="body2" color="primary.dark">
            <strong>Следующий шаг:</strong> Для верификации результатов вы можете 
            заказать независимую экспертную оценку через маркетплейс экспертов платформы.
          </Typography>
        </Paper>

      </Container>
    </Box>
  )
}