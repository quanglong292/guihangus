import axios from './config'

export const configData = async () => {
  const result = await axios.get('/config')
  return result
}

export const updateShipE = async (payload) => {
  const result = await axios.put('/config/update-key-shipe', payload)
  return result
}

export const updateSquare = async (payload) => {
  const result = await axios.put('/config/update-key-square', payload)
  return result
}

export const updateMailGun = async (payload) => {
  const result = await axios.put('/config/update-key-mailgun', payload)
  return result
}

export const updateGHUSInfo = async (payload) => {
  const result = await axios.put('config/update-info', payload)
  return result
}