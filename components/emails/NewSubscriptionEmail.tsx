import { Heading, Text } from '@react-email/components';
import Email from './Email';
import { Session } from 'next-auth';

function NewSubscriptionEmail({ session }: { session: Session | null }) {
  return (
    <Email>
      {/* <Img
        src={LOGO_URL}
        width="100"
        height="21"
        alt="AntiExcel"
        className="mx-auto my-5"
      /> */}
      <Heading as="h1">Dear {session?.user.name},</Heading>
      <Text>
        Welcome to AntiExcel! Now that you&apos;re a new subscriber, we&apos;re
        thrilled to tell you what to expect from our platform.
      </Text>
      <Text>As a PRO Member, you have no limit.</Text>
      <Text>
        You can create, update, and delete an unlimited number of students.
      </Text>
      <Text>
        You can create, update and delete an unlimited number of teachers.
      </Text>
      <Text>
        You have access to real-time data of both, students and teachers.
      </Text>
      <Text>
        More features are coming in! Stay tuned! Enjoy the freedom and the
        flexibility of management.
      </Text>
      <Text>We&apos;re ready to answer any of your questions.</Text>
      <Text>--- AntiExcel Team.</Text>
    </Email>
  );
}

export default NewSubscriptionEmail;
