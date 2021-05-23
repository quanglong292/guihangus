/*eslint no-irregular-whitespace: "error"*/
import axios from './config'

export const createCustomer = async (body) => {
  const result = await axios.post(`/user`, body)
  return result
}

export const getCustomers = async (query) => {
  const result = await axios.get(`/user/customer`, { params: query})
  return result
}

export const getUsers = async (query) => {
  const result = await axios.get(`/user`, { params: query})
  return result
}

export const getUserById = async (id) => {
  const result = await axios.get(`/user/detail/${id}`)
  return result
}

export const emailExisted = async (body) => {
  const result = await axios.get(`/user/check-account?email=${body}`)
  return result
}

export const changePass = async (body) => {
  const result = await axios.post(`/auth/confirm-account`, body)
  return result
}

export const getInfoUser = async () => {
  const result = await axios.get(`/user/get-me`)
  return result
}

export const update = async (body) => {
  const result = await axios.put(`/user`, body)
  return result
}

export const forgotPwd = async (body) => {
  const result = await axios.get(`/user/forgot-pwd?email=${body}`)
  return result
}

export const verifyCode = async (body) => {
  const result = await axios.put(`/user/confirm-code`, body)
  return result
}

export const uploadAvatar = async (file) => {
  const result = await axios.post(`/user/upload-avatar`, file, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  return result
}

export const uploadAvatarById = async (id, file) => {
  const result = await axios.post(`/user/${id}/upload-avatar`, file, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  return result
}

export const deActiveUsers = async (payload) => {
  const result = await axios.put(`/user/change-status`, payload)
  return result
}

export const countUserIsTrash = async () => {
  const result = await axios.get(`/user/count-user-trash`)
  return result
}

export const countCustomerIsTrash = async () => {
  const result = await axios.get(`/user/count-customer-trash`)
  return result
}

export const updateUsersRole = async (id) => {
  const result = await axios.put(`/user/update-role/${id}`)
  return result
}

export const uploadUserById = async (id, payload) => {
  const result = await axios.put(`/user/update-info/${id}`, payload)
  return result
}