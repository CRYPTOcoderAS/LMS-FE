import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL
})

export const createUser = (userData) => {
  return api.post('/users', userData)
}

export const createLoan = (loanData) => {
  return api.post('/loans', loanData)
}

export const getLoanLedger = (loanId) => {
  return api.get(`/loans/${loanId}`)
}

export const downloadLedger = (loanId) => {
  return api.get(`/loans/${loanId}/download`, {
    responseType: 'blob'
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `loan-ledger-${loanId}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  })
}