import axios from './config'

export const sendMail = async (body) => {
  const result = await axios.post('/guest/send-mail-contact', body)
  return result
}