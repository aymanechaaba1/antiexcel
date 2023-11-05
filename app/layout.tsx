import { getServerSession } from 'next-auth';
import Provider from './_trpc/Provider';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="p-4">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              <Header />
              <main>{children}</main>
            </Provider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
