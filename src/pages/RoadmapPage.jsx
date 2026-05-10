import {
    Box, Container, Typography, Card, CardContent,
    Chip, LinearProgress, Accordion, AccordionSummary,
    AccordionDetails, Button, Avatar, Divider
  } from '@mui/material'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import CheckCircleIcon from '@mui/icons-material/CheckCircle'
  import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
  import AccessTimeIcon from '@mui/icons-material/AccessTime'
  import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
  
  const recommendations = [
    {
      id: 1,
      priority: 'Высокий',
      code: '2.11.1',
      title: 'Создать Комитет по аудиту при Совете директоров',
      description: 'Отсутствие Комитета по аудиту является существенным нарушением Кодекса КУ РК. Комитет должен включать не менее одного независимого директора.',
      impact: '+1.2 к рейтингу',
      deadline: 'Q1 2025',
      status: 'todo',
      steps: [
        'Утвердить Положение о Комитете по аудиту',
        'Определить состав комитета (не менее 3 членов)',
        'Провести первое заседание и зафиксировать протокол',
        'Раскрыть информацию в годовом отчёте',
      ]
    },
    {
      id: 2,
      priority: 'Высокий',
      code: '2.13.2',
      title: 'Провести внешнюю оценку Совета директоров',
      description: 'Согласно п. 2.13.2 Кодекса КУ РК, внешняя независимая оценка СД должна проводиться не реже одного раза в три года.',
      impact: '+0.8 к рейтингу',
      deadline: 'Q2 2025',
      status: 'inprogress',
      steps: [
        'Выбрать независимого оценщика через маркетплейс экспертов',
        'Согласовать методологию оценки',
        'Провести оценку и получить заключение',
        'Утвердить план улучшений по итогам оценки',
      ]
    },
    {
      id: 3,
      priority: 'Средний',
      code: '2.6.2',
      title: 'Организовать регулярное обучение членов СД',
      description: 'Члены Совета директоров должны ежегодно повышать квалификацию в области корпоративного управления.',
      impact: '+0.5 к рейтингу',
      deadline: 'Q3 2025',
      status: 'todo',
      steps: [
        'Разработать план обучения на год',
        'Выбрать провайдера обучения',
        'Провести обучение и зафиксировать сертификаты',
      ]
    },
    {
      id: 4,
      priority: 'Средний',
      code: '2.12.1',
      title: 'Создать Комитет по вознаграждениям',
      description: 'Комитет по вознаграждениям определяет политику оплаты труда менеджмента и директоров.',
      impact: '+0.6 к рейтингу',
      deadline: 'Q2 2025',
      status: 'done',
      steps: [
        'Утвердить Положение о Комитете',
        'Сформировать состав',
        'Утвердить политику вознаграждений',
      ]
    },
    {
      id: 5,
      priority: 'Низкий',
      code: '2.3.2',
      title: 'Проверить соответствие независимых директоров критериям',
      description: 'Убедиться что все независимые директора соответствуют критериям независимости согласно Кодексу КУ РК.',
      impact: '+0.3 к рейтингу',
      deadline: 'Q4 2025',
      status: 'todo',
      steps: [
        'Провести анализ аффилированности каждого директора',
        'Получить письменные подтверждения независимости',
        'Раскрыть информацию на сайте компании',
      ]
    },
  ]
  
  function getPriorityColor(p) {
    if (p === 'Высокий') return 'error'
    if (p === 'Средний') return 'warning'
    return 'default'
  }
  
  function getStatusIcon(status) {
    if (status === 'done')
      return <CheckCircleIcon sx={{ color: '#059669', fontSize: 20 }} />
    if (status === 'inprogress')
      return <AccessTimeIcon sx={{ color: '#D97706', fontSize: 20 }} />
    return <RadioButtonUncheckedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
  }
  
  function getStatusLabel(status) {
    if (status === 'done') return { label: 'Выполнено', color: 'success' }
    if (status === 'inprogress') return { label: 'В работе', color: 'warning' }
    return { label: 'Не начато', color: 'default' }
  }
  
  const done       = recommendations.filter(r => r.status === 'done').length
  const inprogress = recommendations.filter(r => r.status === 'inprogress').length
  const total      = recommendations.length
  const progress   = Math.round((done / total) * 100)
  
  export default function RoadmapPage() {
    return (
      <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
  
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AutoAwesomeIcon color="primary" />
              <Typography variant="h4" fontWeight={800}>
                ИИ-дорожная карта улучшений
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Персонализированные рекомендации на основе результатов оценки · 2024
            </Typography>
          </Box>
  
          {/* Progress card */}
          <Card sx={{ borderRadius: 2, mb: 4, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight={700}>Общий прогресс выполнения</Typography>
                <Typography fontWeight={700} color="primary">{progress}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress}
                sx={{ height: 10, borderRadius: 5, mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleIcon sx={{ color: '#059669', fontSize: 16 }} />
                  <Typography variant="caption">{done} выполнено</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ color: '#D97706', fontSize: 16 }} />
                  <Typography variant="caption">{inprogress} в работе</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <RadioButtonUncheckedIcon sx={{ color: '#94A3B8', fontSize: 16 }} />
                  <Typography variant="caption">
                    {total - done - inprogress} не начато
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
  
          {/* Potential rating gain */}
          <Card sx={{ borderRadius: 2, mb: 4, bgcolor: '#EFF6FF',
            border: '1px solid #BFDBFE', boxShadow: 0 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={700} color="primary.dark" gutterBottom>
                Потенциал роста рейтинга KZ-CGR
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Текущий</Typography>
                  <Typography variant="h4" fontWeight={800} color="text.primary">6</Typography>
                </Box>
                <Typography variant="h5" color="text.disabled">→</Typography>
                <Box>
                  <Typography variant="caption" color="text.secondary">После выполнения</Typography>
                  <Typography variant="h4" fontWeight={800} color="success.main">9</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  При выполнении всех рекомендаций рейтинг вырастет на <strong>+3.4 пункта</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
  
          {/* Recommendations list */}
          <Typography variant="h6" fontWeight={700} mb={2}>
            Рекомендации ({total})
          </Typography>
  
          {recommendations.map((r, i) => {
            const statusInfo = getStatusLabel(r.status)
            return (
              <Accordion key={r.id} sx={{
                mb: 1.5, borderRadius: '12px !important',
                border: '1px solid #E2E8F0', boxShadow: 1,
                '&:before': { display: 'none' }
              }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  sx={{ px: 3, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center',
                    gap: 2, flex: 1, flexWrap: 'wrap' }}>
                    {getStatusIcon(r.status)}
                    <Avatar sx={{ width: 28, height: 28, fontSize: 11,
                      bgcolor: 'transparent', border: '1px solid #CBD5E1',
                      color: 'text.secondary' }}>
                      {i + 1}
                    </Avatar>
                    <Typography fontWeight={600} sx={{ flex: 1 }}>
                      {r.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={r.priority} size="small"
                        color={getPriorityColor(r.priority)} />
                      <Chip label={statusInfo.label} size="small"
                        color={statusInfo.color} variant="outlined" />
                      <Chip label={r.impact} size="small"
                        color="success" variant="outlined" />
                    </Box>
                  </Box>
                </AccordionSummary>
  
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={r.code} size="small" variant="outlined"
                      color="primary" sx={{ fontFamily: 'monospace' }} />
                    <Chip label={`Срок: ${r.deadline}`} size="small"
                      variant="outlined" icon={<AccessTimeIcon />} />
                  </Box>
  
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {r.description}
                  </Typography>
  
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    Шаги выполнения:
                  </Typography>
                  {r.steps.map((step, si) => (
                    <Box key={si} sx={{ display: 'flex', gap: 1.5,
                      alignItems: 'flex-start', mb: 1 }}>
                      <Avatar sx={{ width: 22, height: 22, fontSize: 11,
                        bgcolor: 'primary.main', flexShrink: 0 }}>
                        {si + 1}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {step}
                      </Typography>
                    </Box>
                  ))}
  
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
                      Отметить выполненным
                    </Button>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                      Назначить ответственного
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          })}
  
        </Container>
      </Box>
    )
  }