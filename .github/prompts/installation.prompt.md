You are an expert in FrontEnd development.

You need to start a new frontend project. For this project the following technologies must be used:
 - React 18 with functional components and hooks
 - TypeScript
 - Vite as the building tool
 - Tailwind CSS for styling
 - React Router for routing
 - Axios for HTTP requests
 - ZOD for validation
 - EsLint and Prettier for code quality

There is got to be a proper pre-commit hook setup using Husky and lint-staged that will do:
 - tsc for changed files (checking types)
 - eslint --fix for changed files

Here is an example flow (below with the steps). Use them as an example. If you need any additional configuration or files add them as well:

Step 1: Initialize Vite + React + TypeScript project
```
npm create vite@latest . -- --template react-ts
```

Step 2: add tailwind css:
```
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npx tailwindcss init -p
```

Step 2_2: Put this into postcss.config.js:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

Step 3: Configure Tailwind CSS:
```tailwind.config.js
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      allowedHosts: true,
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
```

Step 4: In src/index.css
```css
@import "tailwindcss";

body {
  font-family: Arial, Helvetica, sans-serif;
}
```

Step 5: Router config file (src/router.tsx):
```tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
```

Step 6: Create Home and About pages in src/pages folder:
```tsx
// Home.tsx
export default function Home() {
  return <div className="p-6">Home</div>;
}

// About.tsx
export default function About() {
  return <div className="p-6">About</div>;
}
```

Step 7: Update src/main.tsx and App.tsx:
```tsx
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// App.tsx
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="flex gap-4 p-4 border-b">
        <Link to="/" className="underline">Home</Link>
        <Link to="/about" className="underline">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

Step 8: Create ZOD env check file:
```tsx
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
```

Step 8.2: create .env file in root folder
```
BACKEND_BASE_URL=''
```

Step 9: Install eslint
```bash
npm install -D eslint prettier \
  eslint-config-prettier eslint-plugin-prettier \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-import eslint-import-resolver-typescript
```

Step 10: Create .eslint.config.js file in the root folder
```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules"] },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "prettier/prettier": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },

  prettierConfig,
];
```

Step 11: Prettier config
```json
{
  "printWidth": 100,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "auto",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "useTabs": false,
  "htmlWhitespaceSensitivity": "css"
}

```

Step 12: Prettier ignore file (.prettierignore)
```
dist
node_modules
coverage
.vscode
.env
.idea
```

Step 13: Husky and lint-staged setup
```bash
npx husky-init && npm install
npm install -D lint-staged
npx husky set .husky/pre-commit "npx lint-staged"
```

Step 14: Create lint-staged.config.js in the root folder
```js
module.exports = {
  "*.{ts,tsx}": [
    "tsc --noEmit",
    "eslint --fix",
    "prettier --write"
  ]
};
```

Step 15: Add scripts to package.json
```json
"scripts": {
  "start:dev": "vite",
  "build": "vite build",
  "lintcheck": "eslint ./src/**/*.{js,ts,tsx}",
  "lintcheck:fix": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "format": "prettier --write 'src/**/*.{ts,tsx,css,md}'",
  "tscheck": "tsc -p tsconfig.json --noEmit"
},
```

Step 16: create notReachable utility (src/utils/notReachable.ts):
```tsx
export const notReachable = (_: never): never => {
  console.error(_);
  throw new Error(`Not reachable state appeared: ${JSON.stringify(_)}`);
};

export const notImplemented = (context?: string): never => {
  throw new Error(`Not implemented: ${context}`);
};
```

Step 18: Update tsconfig.json to include src folder paths
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext", "ES2023"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowImportingTsExtensions": true,
    "moduleDetection": "force",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedSideEffectImports": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "sourceMap": false,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```