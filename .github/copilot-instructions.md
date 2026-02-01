You are a Frontend Engineer expert.

# Generating new modules

When asked to generate a new module, follow these guidelines:

1. Use TypeScript. Everywhere
2. If it is needed to add a form, use Zod for validation
3. If new module needs to read environment variables, use zod to validate them. Create a dedicated file `env.ts` in the `src` folder for this purpose.
4. Ensure all code adheres to ESLint and Prettier configurations.
5. If new module requires styling, use Tailwind CSS classes. Avoid custom CSS unless absolutely necessary.
6. Write components as functional components using React Hooks.
7. If new module is a page, create a new folder in `src/pages` with an `index.tsx` file for the main component.

# API Integration
If new module needs API integration use the following logic:
- Dumb component (e.g. MyNewPage.tsx) as a starting point
- Inside it, use a container component (e.g. MyNewPageLoader.tsx) to GET data from the backend when mounted
- Use custom hook in folder `src/utils` (e.g. useApi). Find examples below.
- For everything else (e.g. if you need to only render) create dumb components
- Before creating a new dumb component, check if you can reuse an existing one from folder `src/components`

## Examples
There is a request to create a new Page module called `UserProfile`. This page should fetch and display user profile information from the backend when mounted.
BE response:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "nonexistent@example.com"
}
```

Example step 1: create new folder `src/pages/UserProfile` with `index.tsx` file:
Example step 2: place any static tsx code in `index.tsx` file (like title, description)
Example step 3: create `UserProfileLoader.tsx` component in the same folder. Use it in `index.tsx` to fetch user profile data when mounted using `useApi` hook from `src/utils/useApi.ts`.
Example step 4: create `src/pages/UserProfile/api` folder with `index.ts` file inside the following content:
```ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<UserData>> => {
  return axios.get<UserData>(`https://jsonplaceholder.typicode.com/users`, config);
};
```

Example step 5: in `UserProfileLoader.tsx` use `useApi` hook to call `fetchUsers` API when component mounts and pass the data to a dumb component `UserProfileView.tsx` created in the same folder to render the profile information:
```tsx
import { useApi } from 'src/utils/useApi';
import { fetchUsers } from './api';

export const UserProfile = () => {
  const { 
    status, 
    data: users, 
    error, 
    request: loadUsers 
  } = useApi(fetchUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  ...
}
```

Example step 6: create `UserProfileView.tsx` dumb component in the same folder to render the user profile information passed from `UserProfileLoader.tsx`:
```tsx
...
eturn (
    <div>
      {status === 'not_requested' && <p>Please enter an ID to start.</p>}
      
      {status === 'error' && (
        <p style={{ color: 'red' }}>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {status === 'loaded' && users.map(user => (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
...
```

# Creating new forms

When asked to create a new form module, follow these guidelines:

1. Use Zod for form and validation. Here is the example:

```ts
// validation.ts
import { z } from "zod";
export const getValidationSchema = () => {
  return z.object({
    email: z.string().email("Invalid email"),
    name: zod.string().min(2, "Name must be at least 2 characters"),
  });
};

// api/index.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CreateUserDTO {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const createUser = (
  data: CreateUserDTO, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CreateUserResponse>> => {
  return axios.post('https://reqres.in/api/users', data, config);
};

// addController.tsx
//... other imports
export const AddController = () => {

  const { 
    status, 
    data: responseData, 
    error, 
    request: performCreate 
  } = useApi(createUser);

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
      }}
      validationSchema={getValidationSchema()}
      onSubmit={async (values) => {
        performCreate({
          email: values.email,
          name: values.name,
        });
      }}
    >
      {({ errors, setFieldValue, values }) => (
        <Form
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
        />
      )}
    </Formik>
  );
};
```
