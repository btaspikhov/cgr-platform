import {
    Box, Container, Typography, Card, CardContent,
    Chip, Button, Divider, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Paper, LinearProgress, Avatar
  } from '@mui/material'
  import DownloadIcon from '@mui/icons-material/Download'
  import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
  import BarChartIcon from '@mui/icons-material/BarChart'
  import HistoryIcon from '@mui/icons-material/History'
  import TrendingUpIcon from '@mui/icons-material/TrendingUp'
  import TrendingDownIcon from '@mui/icons-material/TrendingDown'
  
  const history = [
    { year: '2024', score: 68, rating: 6, status: 'Самооценка',  verified: false, date: '15.03.2024' },
    { year: '2023', score: 61, rating: 5, status: 'Верифицировано', verified: true,  date: '20.02.2023' },
    { year: '2022', score: 54, rating: 5, status: 'Самооценка',  verified: false, date: '10.04.2022' },
    { year: '2021', score: 48, rating: 4, status: 'Самооценка',  verified: false, date: '05.03.2021' },
  ]
  
  const blocks = [
    { name: 'Права акционеров',       code: '1', score: 80 },
    { name: 'Совет директоров',        code: '2', score: 62 },
    { name: 'Исполнительный орган',    code: '3', score: 75 },
    { name: 'Раскрытие информации',    code: '4', score: 70 },
    { name: 'Управление рисками',      code: '5', score: 55 },
    { name: 'Дивидендная политика',    code: '6', score: 90 },
    { name: 'Корпоративная этика',     code: '7', score: 65 },
    { name: 'Взаимодействие со стейкхолдерами', code: '8', score: 58 },
  ]
  
  function getScoreColor(score) {
    if (score >= 75) return '#059669'
    if (score >= 60) return '#2563EB'
    if (score >= 45) return '#D97706'
    return '#DC2626'
  }
  
  function getTrend(curr, prev) {
    const diff = curr - prev
    if (diff > 0) return (
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#059669' }}>
        <TrendingUpIcon fontSize="small" />
        <Typography variant="caption" fontWeight={700}>+{diff}</Typography>
      </Box>
    )
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#DC2626' }}>
        <TrendingDownIcon fontSize="small" />
        <Typography variant="caption" fontWeight={700}>{diff}</Typography>
      </Box>
    )
  }
  
  export default function ReportsPage() {
    return (
      <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
  
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Отчёты и история оценок
              </Typography>
              <Typography variant="body1" color="text.secondary">
                АО «Ваша компания» · KZ-CGR платформа
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<DownloadIcon />}
              sx={{ borderRadius: 2 }}>
              Скачать отчёт 2024
            </Button>
          </Box>
  
          {/* Current result */}
          <Card sx={{ borderRadius: 2, mb: 4, boxShadow: 3,
            background: 'linear-gradient(135deg, #1B3568 0%, #2563EB 100%)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Текущий рейтинг · 2024
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 1 }}>
                <Box sx={{
                  width: 96, height: 96, borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Typography variant="h3" fontWeight={900} color="white">
                    6
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="white">
                    Удовлетворительно
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Итоговый балл: 68% · 15 марта 2024
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label="Самооценка" size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    <Chip label="+7% к прошлому году" size="small"
                      sx={{ bgcolor: 'rgba(5,150,105,0.3)', color: '#6EE7B7' }} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
  
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
  
            {/* Left column */}
            <Box sx={{ flex: 2, minWidth: 300 }}>
  
              {/* Blocks breakdown */}
              <Card sx={{ borderRadius: 2, mb: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center',
                    gap: 1, mb: 3 }}>
                    <BarChartIcon color="primary" />
                    <Typography variant="h6" fontWeight={700}>
                      Результаты по блокам
                    </Typography>
                  </Box>
                  {blocks.map(block => (
                    <Box key={block.code} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between',
                        mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 22, height: 22, fontSize: 10,
                            bgcolor: getScoreColor(block.score) }}>
                            {block.code}
                          </Avatar>
                          <Typography variant="body2">{block.name}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={700}
                          color={getScoreColor(block.score)}>
                          {block.score}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate" value={block.score}
                        sx={{
                          height: 8, borderRadius: 4,
                          bgcolor: '#F1F5F9',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getScoreColor(block.score),
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
  
            {/* Right column */}
            <Box sx={{ flex: 1, minWidth: 280 }}>
  
              {/* History */}
              <Card sx={{ borderRadius: 2, mb: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center',
                    gap: 1, mb: 2 }}>
                    <HistoryIcon color="primary" />
                    <Typography variant="h6" fontWeight={700}>
                      История оценок
                    </Typography>
                  </Box>
                  {history.map((h, i) => (
                    <Box key={h.year}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', py: 1.5 }}>
                        <Box>
                          <Typography fontWeight={700}>{h.year}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {h.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {i < history.length - 1 &&
                            getTrend(h.score, history[i + 1].score)}
                          <Avatar sx={{ width: 36, height: 36, fontSize: 14,
                            fontWeight: 800,
                            bgcolor: getScoreColor(h.score) }}>
                            {h.rating}
                          </Avatar>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, pb: 1 }}>
                        <Chip label={`${h.score}%`} size="small" variant="outlined" />
                        <Chip
                          label={h.status}
                          size="small"
                          color={h.verified ? 'success' : 'default'}
                          variant={h.verified ? 'filled' : 'outlined'}
                        />
                      </Box>
                      {i < history.length - 1 && <Divider />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
  
              {/* Download reports */}
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center',
                    gap: 1, mb: 2 }}>
                    <PictureAsPdfIcon color="error" />
                    <Typography variant="h6" fontWeight={700}>
                      Документы
                    </Typography>
                  </Box>
                  {[
                    { name: 'Отчёт КУ 2024', size: '2.4 МБ' },
                    { name: 'Отчёт КУ 2023', size: '2.1 МБ' },
                    { name: 'Заключение эксперта 2023', size: '1.8 МБ' },
                    { name: 'Дорожная карта 2024', size: '0.9 МБ' },
                  ].map(doc => (
                    <Box key={doc.name} sx={{ display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center',
                      py: 1, borderBottom: '1px solid #F1F5F9' }}>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {doc.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          PDF · {doc.size}
                        </Typography>
                      </Box>
                      <Button size="small" startIcon={<DownloadIcon />}
                        sx={{ borderRadius: 2 }}>
                        PDF
                      </Button>
                    </Box>
                  ))}
                </CardContent>
              </Card>
  
            </Box>
          </Box>
  
        </Container>
      </Box>
    )
  }