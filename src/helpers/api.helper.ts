import { API_DOMAIN } from '../configs/apiConfig';
import { create } from 'apisauce'


export const api = create({ baseURL: API_DOMAIN, timeout: 30000 })

export type HttpData<T> = {
  data?: T;
  error?: string;
  msg?: any;
};