import myRequest from '~/utils/myRequest'

export const getDatabaseTables = async () => {
  const result = await myRequest.get('/v1/auth/code/database/tables')
  return result
}

export const getDatabaseTableColumns = async (name: string) => {
  const result = await myRequest.get(`/v1/auth/code/database/columns`, { name })
  return result
}
