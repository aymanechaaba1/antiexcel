import { getServerSession } from 'next-auth';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import UpgradeBanner from '@/components/UpgradeBanner';
import SubscriptionProvider from '@/providers/SubscriptionProvider';
import { Toaster } from '@/components/ui/toaster';
import { uncached_user } from '@/prisma/db-calls';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import { authOptions } from '@/lib/auth';
import UpdateURL from '@/components/UpdateURL';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const session = await getServerSession();
=======
  const session = await getServerSession(authOptions);

  let user: Awaited<ReturnType<typeof uncached_user>> | undefined;
  if (session) user = await uncached_user(session.user.id);
  else user = undefined;
>>>>>>> filter-by-date-range

  return (
    <ReactQueryClientProvider>
      <SessionProvider session={session}>
        <html lang="en">
          <body className="">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SubscriptionProvider user={user}>
                <UpdateURL>
                  <Header />
                  <UpgradeBanner />
                  <main className="p-4">{children}</main>
<<<<<<< HEAD
                  <Toaster />
                </UpdateURLPattern>
              </PaypalProvider>
=======
                </UpdateURL>
              </SubscriptionProvider>
              <Toaster />
>>>>>>> filter-by-date-range
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </ReactQueryClientProvider>
  );
}
