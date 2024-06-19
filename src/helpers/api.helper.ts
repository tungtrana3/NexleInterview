import { STRING } from '../constants/String';
import { API_DOMAIN } from '../configs/apiConfig';
import axios from 'axios';

export type HttpData<T> = {
  data?: T;
  error?: string;
  message?: any;
};
export async function get(path: string): Promise<any> {
  console.log(`API Fetching: ${API_DOMAIN}/${path}`);
  const config = {
    headers: {},
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.get(`${API_DOMAIN}/${path}`, config);
    console.log(`API Result: ${result}`);
    return result;
  } catch (error) {
    console.log(`API Error: ${error}`);
    result.message = STRING.apiError;
    result.error = true;
  }
  return result;
}

export async function post(path: string, data: any): Promise<any> {
  console.log(`API Fetching: ${API_DOMAIN}/${path}`);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.post(`${API_DOMAIN}/${path}`, data, config);
    console.log(`API Result: ${result}`);
    return result;
  } catch (error) {
    console.log(`API Error: ${error}`);
    result.message = STRING.apiError;
    result.error = true;
  }
  return result;
}

export async function uploadFile(path: string, data: any): Promise<any> {
  console.log(`API Fetching: ${API_DOMAIN}/${path}`);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.post(`${API_DOMAIN}/${path}`, data, config);
    console.log(`API Result: ${result}`);
    return result;
  } catch (error) {
    console.log(`API Error: ${error}`);
    result.message = STRING.apiError;
    result.error = true;
  }
  return result;
}

export function convertURLParam(url: string, query: any) {
  url = url + '?';
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      url = `${url}${key}=${query[key]}&`;
    }
  }
  return url;
}
