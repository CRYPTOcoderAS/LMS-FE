import { Routes, Route } from 'react-router-dom'
import OnboardingForm from './pages/OnboardingForm'
import LoanDetails from './pages/LoanDetails'
import LoanLedger from './pages/LoanLedger'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<OnboardingForm />} />
          <Route path="/loan-details" element={<LoanDetails />} />
          <Route path="/loan-ledger/:id" element={<LoanLedger />} />
        </Routes>
      </Container>
    </>
  )
}

export default App