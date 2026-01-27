import { z } from 'zod';

const envSchema = z.object({
  BACKEND_BASE_URL: z.url(),
});

const parsedEnv = envSchema.safeParse({
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
});

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.issues.map((error) => {
    const key = error.path.join('.');
    const issue = error.message;
    const code = error.code;
    return `${key}: ${issue} (code: ${code})`;
  });
  const errorMessage = ['Invalid environment variables:', ...formattedErrors].join('\n');
  console.error(errorMessage);
  throw new Error(errorMessage);
}

export const ENV = parsedEnv.data;
