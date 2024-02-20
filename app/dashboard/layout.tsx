import React, { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="h2  mb-5">Dashboard</h2>
      {children}
    </>
  );
}

export default DashboardLayout;
