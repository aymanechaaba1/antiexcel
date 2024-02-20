import { ReactNode } from 'react';

function ContactsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="h2 mb-5">Contacts</h2>
      {children}
    </>
  );
}

export default ContactsLayout;
