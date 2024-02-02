import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '.';

export const trpc = createTRPCReact<AppRouter>();
export type RouterOutput = inferRouterOutputs<AppRouter>;
