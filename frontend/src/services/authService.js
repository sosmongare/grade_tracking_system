import api, { EndPoints } from '../api/axios'

export async function loginAxios(userModel) {
  return await api.post(EndPoints.login, userModel)
}

export async function registerAxios(registerModel) {
  return await api.post(EndPoints.register, registerModel)
}

export async function changePasswordAxios(changePasswordModel) {
  return await api.put(
    `${EndPoints.users}/${changePasswordModel.id}`,
    changePasswordModel
  )
}
