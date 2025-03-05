import myRequest from "~/utils/myRequest"

export const useFetchGetAuthProfile = () => {
  return myRequest.get('/v1/auth/profile')
}

export const fetchAuthLogout = () => {
  return myRequest.post('/v1/auth/logout')
}