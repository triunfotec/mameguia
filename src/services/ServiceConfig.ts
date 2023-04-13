/* eslint-disable @typescript-eslint/naming-convention */

import {Store} from 'redux'

import ApplicationStore from 'ApplicationStore'
import axios from 'axios'

import {
  THttpResponse,
  IHttpClient,
  TServiceRequestConfig,
} from '@/services/ServiceConfig.types'

import {baseURL} from './api'

export class ServiceConfig implements IHttpClient {
  public readonly timeout = 60000

  public async get<T, R = THttpResponse<T>>(
    url: string,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.get(url, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async post<T, B, R = THttpResponse<T>>(
    url: string,
    data?: B,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.post(url, data, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async put<T, B, R = THttpResponse<T>>(
    url: string,
    data?: B,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.put(url, data, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async delete<T, R = THttpResponse<T>>(
    url: string,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.delete(url, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async applyInterceptors(store: Store<ApplicationStore.State>) {
    axios.interceptors.request.use(async request => ({
      ...request,
      baseURL: baseURL,
      timeout: this.getTimeout(request),
      //headers: await this.getHeaders(request, store),
    }))

    axios.interceptors.response.use(
      response => ({
        ...response,
        data: response.data,
        config: {
          ...response.config,
          timeout: this.getTimeout(response),
        },
      }),
      error => {
        return Promise.reject(this.getError(error))
      },
    )
  }

  public async getHeaders(
    requestOrResponse: TServiceRequestConfig | THttpResponse,
    store: Store<ApplicationStore.State>,
  ) {
    const authToken = 'aaaaa' //store?.getState()?.user?.authToken

    const headers = {
      ...requestOrResponse.headers,
      ...(authToken && {
        Authorization: `Bearer ${authToken}`,
      }),
    }

    return headers
  }

  public getError(errorResponse: any): string {
    let error: string = ''

    if (errorResponse?.response) {
      const errorMessages = errorResponse?.response.data
      error = errorMessages ?? ''
    }

    return error ?? ''
  }

  public getTimeout(requestOrResponse: any): number {
    const timeout: number = this.isRequest(requestOrResponse)
      ? requestOrResponse?.timeout
      : requestOrResponse?.config?.timeout

    return timeout > 0 ? timeout : this.timeout
  }

  public isRequest(requestOrResponse: any): boolean {
    return typeof requestOrResponse?.config !== 'object'
  }
}

export default new ServiceConfig()
