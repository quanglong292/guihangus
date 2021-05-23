import axios from './config'

export const CreateLabel = async (body) => {
  const result = await axios.post('/order/label', body)
  return result
}

export const compressLabel = async (body) => {
  const result = await axios.post('/order/pdf', { image: body }, { responseType: 'blob' })
  return result
}

// rate

export const rateOrder = async (body) => {
  const result = await axios.post('/order/rates', body)
  return result
}

export const ZipCode = async (zip) => {
  const result = await axios.get(`/address/city-zip/${zip}`)
  return result
}