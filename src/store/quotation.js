import axios from './config'

export const quotations = async (query) => {
  const result = await axios.get('/quotation', {params: query})
  return result
}

export const createQuotation = async (body) => {
  const result = await axios.post('/quotation', body)
  return result
}

export const updateQuotation = async (id, body) => {
  const result = await axios.put(`/quotation/${id}`, body)
  return result
}

export const activeQuotations = async (payload) => {
  const result = await axios.put(`/quotation/change-status-active`, payload)
  return result
}

export const trashQuotations = async () => {
  const result = await axios.get(`/quotation/count-quotation-trash`)
  return result
}