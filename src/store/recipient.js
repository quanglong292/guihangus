import axios from './config'

export const Recipients = async () => {
  const result = await axios.get(`/recipient/shipper`)
  return result
}

export const createRecipient = async (body) => {
  const result = await axios.post(`/recipient`, body)
  return result
}

export const removeRecipient = async (id) => {
  const result = await axios.delete(`/recipient/${id}`)
  return result
}

// Address
export const Provinces = async () => {
  const result = await axios.get(`/address/province`)
  return result
}

export const District = async (provinceCode) => {
  const result = await axios.get(`/address/district?provinceCode=${provinceCode}`)
  return result
}

export const Ward = async (districtCode) => {
  const result = await axios.get(`/address/ward?districtCode=${districtCode}`)
  return result
}