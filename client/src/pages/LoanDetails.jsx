import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert,
  CircularProgress 
} from '@mui/material'
import { createLoan } from '../services/api'
import { motion } from 'framer-motion'

const LoanDetails = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    disbursementDate: '',
    amount: '',
    interestRate: '',
    tenure: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userId = localStorage.getItem('userId')
      const response = await createLoan({
        ...formData,
        userId,
        amount: Number(formData.amount),
        interestRate: Number(formData.interestRate),
        tenure: Number(formData.tenure)
      })
      navigate(`/loan-ledger/${response.data._id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Loan Details
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Disbursement Date"
            name="disbursementDate"
            type="date"
            value={formData.disbursementDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="Loan Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          
          <TextField
            label="Interest Rate (%)"
            name="interestRate"
            type="number"
            value={formData.interestRate}
            onChange={handleChange}
            required
          />
          
          <TextField
            label="Tenure (Years)"
            name="tenure"
            type="number"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Calculate EMI'}
          </Button>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default LoanDetails