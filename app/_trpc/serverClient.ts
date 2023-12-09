import { appRouter } from '@/server';
import { httpBatchLink } from '@trpc/client';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `http://localhost:443/api/trpc`,
    }),
  ],
});
