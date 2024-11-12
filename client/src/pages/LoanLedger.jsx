import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Alert,
  CircularProgress 
} from '@mui/material'
import { getLoanLedger, downloadLedger } from '../services/api'
import { motion } from 'framer-motion'

const LoanLedger = () => {
  const { id } = useParams()
  const [loan, setLoan] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await getLoanLedger(id)
        setLoan(response.data)
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchLoan()
  }, [id])

  const handleDownload = async () => {
    try {
      await downloadLedger(id)
    } catch (err) {
      setError(err.response?.data?.error || 'Download failed')
    }
  }

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>
  if (!loan) return <Typography>No loan data available.</Typography>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Loan Ledger
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={handleDownload}
          sx={{ mb: 2 }}
        >
          Download CSV
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Due Date</TableCell>
                <TableCell align="right">EMI Amount</TableCell>
                <TableCell align="right">Principal</TableCell>
                <TableCell align="right">Interest</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loan.emiSchedule?.map((emi, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {emi.dueDate ? new Date(emi.dueDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell align="right">
                    ₹{typeof emi.amount === 'number' ? emi.amount.toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell align="right">
                    ₹{typeof emi.principal === 'number' ? emi.principal.toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell align="right">
                    ₹{typeof emi.interest === 'number' ? emi.interest.toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell align="right">
                    ₹{typeof emi.outstandingBalance === 'number' ? emi.outstandingBalance.toFixed(2) : '0.00'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  )
}

export default LoanLedger