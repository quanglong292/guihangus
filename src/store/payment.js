import axios from './config'

export const payment = async (body) => {
  const result = await axios.post('/payment', body)
  return result
}

export const getSquare = async (id) => {
  const result = await axios.get(`/payment/url-square/${id}`)
  return result
}

export const paymentPay = async (id, transactionId) => {
  const result = await axios.put(`/payment/pay/${id}?transactionId=${transactionId}`)
  return result
}

export const getPayments = async (query) => {
  const result = await axios.get('/payment', { params: query})
  return result
}

export const cancelPayment = async (id) => {
  const result = await axios.put(`/payment/cancel/${id}`)
  return result
}

