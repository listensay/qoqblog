import myRequest from "../../utils/myRequest"

export const useFechGetAuthProfile = () => {
  return myRequest.get('/v1/auth/profile')
}