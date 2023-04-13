import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'
import {IUser} from '@/types/entities/User/UserEntity.types'

export default class UserService {
  constructor(private readonly httpClient: IHttpClient) {}

  putUser = (user: Partial<IUser>) =>
    this.httpClient.put(`${baseURL}/users/${user.id}`, user)

  deleteUser = (userId: number) =>
    this.httpClient.delete(`${baseURL}/users/${userId}`)
}
