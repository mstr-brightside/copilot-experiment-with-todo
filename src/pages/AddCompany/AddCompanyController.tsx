import { Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useApi } from '../../utils/useApi';

import { AddCompanyView } from './AddCompanyView';
import { createCompany, CreateCompanyDTO } from './api';
import { getValidationSchema } from './validation';

export const AddCompanyController = () => {
  const navigate = useNavigate();
  const { status, request: performCreate } = useApi(createCompany);

  const validate = (values: CreateCompanyDTO) => {
    try {
      getValidationSchema().parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten((issue) => issue.message).fieldErrors as Partial<
          Record<keyof CreateCompanyDTO, string[] | undefined>
        >;
        const formattedErrors: Record<string, string> = {};

        Object.entries(fieldErrors).forEach(([key, messages]) => {
          if (messages && messages.length > 0) {
            formattedErrors[key] = messages[0];
          }
        });

        return formattedErrors;
      }
      return {};
    }
  };

  return (
    <Formik<CreateCompanyDTO>
      initialValues={{
        companyName: '',
        companyITIN: 0,
        phone: 0,
        country: '',
        email: '',
      }}
      validate={validate}
      onSubmit={async (values) => {
        try {
          await performCreate(values);
          navigate('/companies');
        } catch (e) {
          // Error handled by useApi state
          console.error('Error creating company:', e);
        }
      }}
    >
      {(formikProps: FormikProps<CreateCompanyDTO>) => (
        <AddCompanyView {...formikProps} status={status} />
      )}
    </Formik>
  );
};
