You are an expert in our internal API.

We are using a `useApi` described below to handle API requests in our React applications.

Create a new file that exports a `useApi` in `src/utils` folder.

Here is the source code for our universal `useApi` hook. Create it!
```ts
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useReducer, useRef, useCallback, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// --- Types ---

type Status = 'not_requested' | 'loading' | 'loaded' | 'error';

interface State<T> {
  status: Status;
  data: T | null;
  error: Error | AxiosError | null;
}

type Action<T> =
  | { type: 'REQUEST_INIT' }
  | { type: 'REQUEST_SUCCESS'; payload: T }
  | { type: 'REQUEST_FAILURE'; payload: Error | AxiosError };

function apiReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'REQUEST_INIT':
      return { ...state, status: 'loading', error: null };
    case 'REQUEST_SUCCESS':
      return { ...state, status: 'loaded', data: action.payload, error: null };
    case 'REQUEST_FAILURE':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

export function useApi<TData, TArgs extends any[] = any[]>(
  apiFunc: (...args: [...TArgs, AxiosRequestConfig | undefined]) => Promise<AxiosResponse<TData>>
) {
  const initialState: State<TData> = {
    status: 'not_requested',
    data: null,
    error: null,
  };

  const [state, dispatch] = useReducer(apiReducer<TData>, initialState);

  const abortControllerRef = useRef<AbortController | null>(null);

  const request = useCallback(
    async (...args: TArgs) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch({ type: 'REQUEST_INIT' });

      try {
        const response = await apiFunc(...args, { signal: controller.signal });
        
        dispatch({ type: 'REQUEST_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch({ type: 'REQUEST_FAILURE', payload: error as Error | AxiosError });
          throw error;
        }
      }
    },
    [apiFunc]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { ...state, request };
}
```
