import { getServerSession } from 'next-auth';
import { TrpcProvider } from './_trpc/trpc-provider';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import PaypalProvider from '@/providers/PaypalProvider';
import UpgradeBanner from '@/components/UpgradeBanner';
import SubscriptionProvider from '@/providers/SubscriptionProvider';
import { Toaster } from '@/components/ui/toaster';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <TrpcProvider>
        <html lang="en">
          <body className="">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <PaypalProvider>
                <Header />
                <SubscriptionProvider>
                  <UpgradeBanner />
                  <main className="p-4">{children}</main>
                  <Toaster />
                </SubscriptionProvider>
              </PaypalProvider>
            </ThemeProvider>
          </body>
        </html>
      </TrpcProvider>
    </SessionProvider>
  );
}
