import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, LinearProgress,
  Card, CardContent, Button
} from '@mui/material'
import { Send } from '@mui/icons-material'
import QuestionCard from '../components/QuestionCard'
import { blocks } from '../data/blocks'

const sdBlock = blocks.find(b => b.key === 'board')

export default function BoardEvaluationPage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})

  const handleChange = (id, value, explanation = '') => {
    setAnswers(prev => ({
      ...prev,
      [id]: { value, explanation: value === 'no' ? explanation : '' }
    }))
  }

  const total      = sdBlock.questions.length
  const answered   = Object.keys(answers).length
  const progress   = Math.round((answered / total) * 100)
  const allAnswered = answered === total
  const noWithoutExplanation = Object.values(answers)
    .filter(a => a.value === 'no' && !a.explanation.trim()).length

  const handleSubmit = () => {
    if (!allAnswered || noWithoutExplanation > 0) return
    navigate('/results', { state: { answers } })
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 860, mx: 'auto', px: 4 }}>

        {/* Page header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="overline" color="text.disabled" fontSize={11} letterSpacing={1.5}>
              Клиентский прототип без серверной части
            </Typography>
            <Typography variant="h4" fontWeight={800} mt={0.5}>
              Оценка Совета директоров
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

        {/* Progress */}
        <Card sx={{ borderRadius: 2, boxShadow: 1, mb: 4 }}>
          <CardContent sx={{ py: 2, px: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight={600}>Прогресс анкеты</Typography>
              <Typography variant="body2" fontWeight={700} color="primary">{progress}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate" value={progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" mt={1} display="block">
              Отвечено {answered} из {total} вопросов
            </Typography>
          </CardContent>
        </Card>

        {/* Block header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="overline" color="text.disabled" fontSize={11}>
              Блок оценки
            </Typography>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Вес {sdBlock.weight}%
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            {sdBlock.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sdBlock.description}
          </Typography>
        </Box>

        {/* Questions */}
        {sdBlock.questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            answer={answers[q.id]}
            onChange={handleChange}
          />
        ))}

        {/* Submit */}
        <Button
          fullWidth variant="contained" size="large"
          startIcon={<Send />}
          disabled={!allAnswered || noWithoutExplanation > 0}
          onClick={handleSubmit}
          sx={{ borderRadius: 2, py: 1.8, fontWeight: 700, mt: 2 }}
        >
          {allAnswered ? 'Отправить оценку' : `Осталось ответить: ${total - answered}`}
        </Button>

      </Box>
    </Box>
  )
}
