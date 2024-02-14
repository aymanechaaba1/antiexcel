import { ReactNode } from 'react';

function TeachersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="h2 mb-5">Teachers</h2>
      {children}
    </>
  );
}

export default TeachersLayout;
