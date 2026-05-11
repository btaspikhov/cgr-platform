import {
    Card, CardContent, Typography, Box,
    Button, ButtonGroup, TextField, Chip, Collapse
  } from '@mui/material'
  import { CheckCircle, Cancel } from '@mui/icons-material'
  
  export default function QuestionCard({ question, answer, onChange }) {
    const { id, text, hint } = question

    return (
      <Card sx={{
        mb: 2, borderRadius: 2,
        border: '1px solid',
        borderColor: answer?.value === 'yes' ? 'success.light'
                   : answer?.value === 'no'  ? 'error.light'
                   : 'divider',
        transition: 'border-color 0.2s'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Chip label={id} size="small"
              sx={{ fontFamily: 'monospace', bgcolor: '#D9F99D', color: '#3F6212', fontWeight: 700, border: 'none' }} />
          </Box>
  
          <Typography variant="body1" fontWeight={500} mb={1}>
            {text}
          </Typography>
  
          {hint && (
            <Typography variant="caption" color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
               {hint}
            </Typography>
          )}
  
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant={answer?.value === 'yes' ? 'contained' : 'outlined'}
              color="success" startIcon={<CheckCircle />}
              onClick={() => onChange(id, 'yes')}
              sx={{ borderRadius: 2 }}
            >
              Да
            </Button>
            <Button
              variant={answer?.value === 'no' ? 'contained' : 'outlined'}
              color="error" startIcon={<Cancel />}
              onClick={() => onChange(id, 'no')}
              sx={{ borderRadius: 2 }}
            >
              Нет
            </Button>
          </Box>
  
          <Collapse in={answer?.value === 'no'}>
            <TextField
              fullWidth multiline rows={3}
              label="Объяснение несоблюдения (причина, план устранения)"
              value={answer?.explanation || ''}
              onChange={e => onChange(id, 'no', e.target.value)}
              variant="outlined" size="small"
              helperText="Обязательно при ответе «Нет»"
              sx={{ mt: 1 }}
            />
          </Collapse>
        </CardContent>
      </Card>
    )
  }