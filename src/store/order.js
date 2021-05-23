import axios from './config'

export const getOrders = async (query) => {
  const result = await axios.get('/order', { params: query})
  return result
}

export const getOrderDetail = async (id) => {
  const result = await axios.get(`/order/${id}`)
  return result
}

export const addComment = async (body) => {
  const result = await axios.post('/comment', body)
  return result
}

export const getCommentDetail = async (id) => {
  const result = await axios.get(`/comment/order/${id}`)
  return result
}

export const getOrderDetailTracking = async (code) => {
  const result = await axios.get(`/order/order_tracking/${code}`)
  return result
}

export const getOrderLasted = async () => {
  const result = await axios.get(`/order/new-lable-detail`)
  return result
}

export const removeOrders = async (payload) => {
  const result = await axios.put(`/order/change-acctive`, payload)
  return result
}

export const getOrderTotal = async () => {
  const result = await axios.get(`/order/count-order`)
  return result
}

export const updateOrderStatus = async (params) => {
  const result = await axios.put(`/order/change-order-status/${params.codeOrder}?orderStatus=${params.status}`)
  return result
}

export const countOrderIsTrash = async (userId) => {
  let url = `/order/count`
  url += userId ? `?userId=${userId}` : ''
  const result = await axios.get(url)
  return result
}

export const updateOrder = async (code, payload) => {
  const result = await axios.put(`/order/edit-order/${code}`, payload)
  return result
}

export const getOrderHistory = async (id) => {
  const result = await axios.get(`/order/order-history/${id}`)
  return result
}

export const getStates = async () => {
  const result = await axios.get(`/address/US-state`)
  return result
}

export const getCities = async (state) => {
  const result = await axios.get(`/address/US/${state}/city`)
  return result
}
