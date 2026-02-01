import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ENV } from '@/env';

export interface CreateCompanyDTO {
  companyName: string;
  companyITIN: number;
  phone: number;
  country: string;
  email: string;
}

export const createCompany = (
  data: CreateCompanyDTO,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  // Assuming void response or don't care about return body
  return axios.post(`${ENV.BACKEND_BASE_URL}/companies`, data, config);
};
