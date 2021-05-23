import axios from './config'

export const Login = async (body) => {
  const result = await axios.post('/auth/login', body)
  return result
}

export const changePwd = async (body) => {
  const result = await axios.post('/auth/changes-pass', body)
  return result
}