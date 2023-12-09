import Section from '@/components/Section';
import Link from 'next/link';
import React from 'react';

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const sideBarNavItems = [
    {
      title: 'Account',
      link: '/settings/account',
    },
    {
      title: 'Plan',
      link: '/settings/plan',
    },
    {
      title: 'Subscription',
      link: '/settings/subscription',
    },
    {
      title: 'Transactions',
      link: '/settings/transactions',
    },
  ];

  return (
    <Section
      title="Settings"
      description="Manage your account settings"
      className="py-4"
    >
      <div className="flex flex-col md:flex-row my-4 gap-5">
        {/* Sidebar */}
        <div className="w-full flex flex-row md:flex-col gap-4 p-4 rounded-lg border md:w-1/3 md:h-96">
          {sideBarNavItems.map((item) => (
            <Link
              href={item.link}
              className="hover:bg-gray-900 px-4 py-2 rounded-md hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <main className="w-full md:2/3">{children}</main>
      </div>
    </Section>
  );
}

export default SettingsLayout;
