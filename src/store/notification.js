import axios from './config'

export const notifications = async (query) => {
  const result = await axios.get('/notification', {params: query})
  return result
}

export const notifyNotSeen = async () => {
  const result = await axios.get('/notification/count-seen')
  return result
}


export const notifySeen = async (id) => {
  const result = await axios.put(`/notification/${id}`)
  return result
}
