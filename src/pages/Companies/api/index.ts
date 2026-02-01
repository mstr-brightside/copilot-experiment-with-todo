import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ENV } from '@/env';

export interface Company {
  id: string;
  companyName: string;
  companyITIN: number;
  phone: number;
  country: string;
  email: string;
}

export const fetchCompanies = (config?: AxiosRequestConfig): Promise<AxiosResponse<Company[]>> => {
  return axios.get<Company[]>(`${ENV.BACKEND_BASE_URL}/companies`, config);
};
