import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const makeHttpRequest = async <T>(
    config: AxiosRequestConfig,
  ): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      return null;
    }
  };

export const makeGetRequest = async<T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T | null> => {
    const getRequestConfig: AxiosRequestConfig = {
        method: "GET",
        url,
        ...config
    }
    return makeHttpRequest<T | null>(getRequestConfig)
}

export const makePostRequest = async<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): Promise<T | null> => {
    const getRequestConfig: AxiosRequestConfig = {
        method: "POST",
        url,
        data,
        ...config
    }
    return makeHttpRequest<T | null>(getRequestConfig)
}

export const makePutRequest = async<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T | null> => {
  const putRequestConfig: AxiosRequestConfig = {
      method: "PUT",
      url,
      data,
      ...config
  }
  return makeHttpRequest<T | null>(putRequestConfig);
}

export const makeDeleteRequest = async<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T | null> => {
  const deleteRequestConfig: AxiosRequestConfig = {
      method: "DELETE",
      url,
      ...config
  }
  return makeHttpRequest<T | null>(deleteRequestConfig);
}