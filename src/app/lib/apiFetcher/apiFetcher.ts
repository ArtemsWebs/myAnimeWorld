import { treaty } from '@elysiajs/eden';
import type { ElysiaApp } from '@/server/src/index';
import { SuperJSON } from 'superjson';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.host;
  if (process.env.VERCEL_URL) return `${process.env.VERCEL_URL}`;
  return `localhost:${process.env.PORT ?? 3000}`;
};

export const fetcherClient = treaty<ElysiaApp>(getBaseUrl(), {
  async onResponse(response) {
    const json = await response.json();
    const superjsonMeta = response.headers.get('superjson-meta');
    const val = superjsonMeta
      ? SuperJSON.deserialize({ json, meta: JSON.parse(superjsonMeta) })
      : json;
    if (!response.ok) {
      throw val;
    }
    return val;
  },
  fetcher: async (...params) => {
    const response = await fetch(...params);

    if (!response.ok) {
      let message = '';
      try {
        const json = (await response.json()) as any;
        message = json.message ?? json.response;
      } catch (err) {
        console.error(err);
      }

      throw new Error(message || 'Ошибка сервера');
    }
    return response;
  },
  headers: {
    'use-superjson': 'true',
  },
});
