import { useEffect } from 'react';

import { useApi } from '../../utils/useApi';

import { fetchCompanies } from './api';
import { CompaniesView } from './CompaniesView';

export const CompaniesLoader = () => {
  const { status, data: companies, error, request: loadCompanies } = useApi(fetchCompanies);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return <CompaniesView status={status} companies={companies} error={error} />;
};
