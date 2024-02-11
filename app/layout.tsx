import { getServerSession } from 'next-auth';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import PaypalProvider from '@/providers/PaypalProvider';
import UpgradeBanner from '@/components/UpgradeBanner';
import SubscriptionProvider from '@/providers/SubscriptionProvider';
import { Toaster } from '@/components/ui/toaster';
import { uncached_user } from '@/prisma/db-calls';
import { QueryClient } from '@tanstack/react-query';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import { authOptions } from '@/lib/auth';
import UpdateURL from '@/components/UpdateURL';

const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const user = await uncached_user(session.user.id);

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
                </UpdateURL>
              </SubscriptionProvider>
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </ReactQueryClientProvider>
  );
}
