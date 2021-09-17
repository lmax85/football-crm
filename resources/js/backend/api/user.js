import request from '@/utils/request'

export function login(data) {
  console.log("🚀 ~ file: user.js ~ line 4 ~ login ~ login", login)
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}
