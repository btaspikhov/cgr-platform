import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, LinearProgress,
  AppBar, Toolbar, Chip, Alert, Paper
} from '@mui/material'
import { ArrowBack, Send } from '@mui/icons-material'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'

export default function QuestionnairePage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})

  const handleChange = (id, value, explanation = '') => {
    setAnswers(prev => ({
      ...prev,
      [id]: { value, explanation: value === 'no' ? explanation : '' }
    }))
  }

  const answered    = Object.keys(answers).length
  const progress    = Math.round((answered / questions.length) * 100)
  const allAnswered = answered === questions.length
  const noWithoutExplanation = Object.values(answers)
    .filter(a => a.value === 'no' && !a.explanation.trim()).length

  const handleSubmit = () => {
    if (!allAnswered) return
    navigate('/results', { state: { answers } })
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFF', minHeight: '100vh' }}>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#EFF6FF',
          border: '1px solid #BFDBFE' }}>
          <Typography variant="body2" color="primary.dark">
            <strong>Принцип «соблюдай или объясняй»:</strong> При ответе «Нет» 
            обязательно укажите причину несоблюдения и план устранения.
            Ответ без объяснения не будет засчитан.
          </Typography>
        </Paper>

        {questions.map(q => (
          <QuestionCard
            key={q.id} question={q}
            answer={answers[q.id]}
            onChange={handleChange}
          />
        ))}

        {noWithoutExplanation > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {noWithoutExplanation} ответ(а) «Нет» без объяснения — заполните перед отправкой
          </Alert>
        )}

        <Button
          fullWidth variant="contained" size="large"
          startIcon={<Send />} onClick={handleSubmit}
          disabled={!allAnswered || noWithoutExplanation > 0}
          sx={{ borderRadius: 2, py: 1.8, fontWeight: 700, mt: 1 }}
        >
          {allAnswered ? 'Отправить оценку' : `Осталось ответить: ${questions.length - answered}`}
        </Button>
      </Container>
    </Box>
  )
}