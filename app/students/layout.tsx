import { DateRangePicker } from '@/components/DateRangePicker';
import React from 'react';

function StudentsPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="h2 mb-5">Students</h2>
      {children}
    </>
  );
}

export default StudentsPageLayout;
