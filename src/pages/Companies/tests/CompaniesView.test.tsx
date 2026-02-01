import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { Company } from '../api'; // Adjust import path as needed based on structure
import { CompaniesView } from '../CompaniesView';

const mockCompanies: Company[] = [
  {
    id: '1',
    companyName: 'Tech Solutions',
    companyITIN: 12345678,
    phone: 1112223333,
    country: 'USA',
    email: 'contact@techsolutions.com',
  },
  {
    id: '2',
    companyName: 'Global Trade',
    companyITIN: 87654321,
    phone: 4445556666,
    country: 'UK',
    email: 'info@globaltrade.co.uk',
  },
];

describe('CompaniesView', () => {
  it('renders without crashing', () => {
    render(<CompaniesView status='not_requested' companies={null} />);
    expect(screen.getByRole('heading', { level: 1, name: /Companies List/i })).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<CompaniesView status='loading' companies={null} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state with specific error message', () => {
    const error = new Error('Failed to fetch data');
    render(<CompaniesView status='error' companies={null} error={error} />);
    expect(screen.getByText(/Error: Failed to fetch data/i)).toBeInTheDocument();
  });

  it('renders error state with unknown error', () => {
    render(<CompaniesView status='error' companies={null} error='random string' />);
    expect(screen.getByText(/Error: Unknown error/i)).toBeInTheDocument();
  });

  it('renders empty state when companies list is empty', () => {
    render(<CompaniesView status='loaded' companies={[]} />);
    expect(screen.getByText(/No companies found/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders table with companies when data is available', () => {
    render(<CompaniesView status='loaded' companies={mockCompanies} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check headers
    expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /ITIN/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Phone/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Country/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Email/i })).toBeInTheDocument();

    // Check data rows
    expect(screen.getByText('Tech Solutions')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();

    expect(screen.getByText('Global Trade')).toBeInTheDocument();
    expect(screen.getByText('87654321')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
  });
});
