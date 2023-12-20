import { authOptions } from '@/lib/auth';
import { TRPCError, initTRPC } from '@trpc/server';
import { getServerSession } from 'next-auth';
import superjson from 'superjson';

export const t = initTRPC.create({
  transformer: superjson,
});
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      user_id: session.user.id,
      user: session.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
