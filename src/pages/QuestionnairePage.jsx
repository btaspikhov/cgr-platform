import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, LinearProgress,
  Card, CardContent, Chip, Divider
} from '@mui/material'
import { Send } from '@mui/icons-material'
import QuestionCard from '../components/QuestionCard'
import { blocks } from '../data/blocks'

const TOTAL_QUESTIONS = blocks.reduce((sum, b) => sum + b.questions.length, 0)

export default function QuestionnairePage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [activeBlock, setActiveBlock] = useState(blocks[0].key)

  const handleChange = (id, value, explanation = '') => {
    setAnswers(prev => ({
      ...prev,
      [id]: { value, explanation: value === 'no' ? explanation : '' }
    }))
  }

  const answered  = Object.keys(answers).length
  const progress  = Math.round((answered / TOTAL_QUESTIONS) * 100)

  const blockAnswered = (block) =>
    block.questions.filter(q => answers[q.id]).length

  const noWithoutExplanation = Object.values(answers)
    .filter(a => a.value === 'no' && !a.explanation.trim()).length

  const allAnswered = answered === TOTAL_QUESTIONS

  const handleSubmit = () => {
    if (!allAnswered || noWithoutExplanation > 0) return
    navigate('/results', { state: { answers } })
  }

  const current = blocks.find(b => b.key === activeBlock)

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFF', minHeight: '100vh' }}>

      {/* Left panel */}
      <Box sx={{
        width: 220, flexShrink: 0,
        borderRight: '1px solid #E2E8F0',
        bgcolor: 'white',
        display: 'flex', flexDirection: 'column',
        pt: 3, pb: 2,
      }}>
        {/* Progress */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="caption" color="text.disabled" display="block" mb={0.5}>
            Прогресс анкеты
          </Typography>
          <Typography variant="h4" fontWeight={800} color="primary" lineHeight={1}>
            {progress}%
          </Typography>
          <LinearProgress
            variant="determinate" value={progress}
            sx={{ mt: 1, height: 6, borderRadius: 3 }}
          />
        </Box>

        <Divider />

        {/* Block list */}
        <Box sx={{ flex: 1, pt: 1 }}>
          {blocks.map(block => {
            const done = blockAnswered(block)
            const active = activeBlock === block.key
            return (
              <Box
                key={block.key}
                onClick={() => setActiveBlock(block.key)}
                sx={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2, py: 1.2,
                  cursor: 'pointer',
                  bgcolor: active ? '#EFF6FF' : 'transparent',
                  borderRight: active ? '3px solid' : '3px solid transparent',
                  borderColor: active ? 'primary.main' : 'transparent',
                  '&:hover': { bgcolor: '#F8FAFF' },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={active ? 700 : 400}
                  color={active ? 'primary.main' : 'text.primary'}
                >
                  {block.label}
                </Typography>
                <Typography variant="caption" color={done === 4 ? 'success.main' : 'text.disabled'}>
                  {done}/4
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, py: 4, px: 4, overflow: 'auto' }}>

        {/* Page header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="overline" color="text.disabled" fontSize={11} letterSpacing={1.5}>
              Клиентский прототип без серверной части
            </Typography>
            <Typography variant="h4" fontWeight={800} mt={0.5}>
              Анкета KZ-CGR
            </Typography>
          </Box>
          <Card sx={{ borderRadius: 2, boxShadow: 2, minWidth: 150, textAlign: 'right' }}>
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

        {/* Block header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="overline" color="text.disabled" fontSize={11}>
              Блок оценки
            </Typography>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Вес {current.weight}%
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            {current.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {current.description}
          </Typography>
        </Box>

        {/* Questions */}
        {current.questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            answer={answers[q.id]}
            onChange={handleChange}
          />
        ))}

        {/* Navigation + submit */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
          <Button
            variant="outlined" sx={{ borderRadius: 2 }}
            disabled={blocks.findIndex(b => b.key === activeBlock) === 0}
            onClick={() => {
              const idx = blocks.findIndex(b => b.key === activeBlock)
              setActiveBlock(blocks[idx - 1].key)
            }}
          >
            ← Назад
          </Button>

          {activeBlock !== blocks[blocks.length - 1].key ? (
            <Button
              variant="contained" sx={{ borderRadius: 2 }}
              onClick={() => {
                const idx = blocks.findIndex(b => b.key === activeBlock)
                setActiveBlock(blocks[idx + 1].key)
              }}
            >
              Далее →
            </Button>
          ) : (
            <Button
              variant="contained" startIcon={<Send />}
              disabled={!allAnswered || noWithoutExplanation > 0}
              onClick={handleSubmit}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              {allAnswered ? 'Отправить оценку' : `Осталось: ${TOTAL_QUESTIONS - answered}`}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
