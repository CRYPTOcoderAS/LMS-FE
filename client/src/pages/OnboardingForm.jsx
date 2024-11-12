import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert 
} from '@mui/material'
import { createUser } from '../services/api'

const OnboardingForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    pan: '',
    aadhaar: '',
    gstin: '',
    udyam: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createUser(formData)
      localStorage.setItem('userId', response.data._id)
      navigate('/loan-details')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Personal Details
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        
        <TextField
          label="PAN Number"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Aadhaar Number"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="GSTIN"
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="UDYAM Number"
          name="udyam"
          value={formData.udyam}
          onChange={handleChange}
          required
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
        >
          Next
        </Button>
      </Box>
    </Paper>
  )
}

export default OnboardingForm