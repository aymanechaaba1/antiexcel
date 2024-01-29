import { Heading, Img, Text } from '@react-email/components';
import Email from './Email';
import { Session } from 'next-auth';

function CanceledSubscriptionEmail({ session }: { session: Session | null }) {
  return (
    <Email>
      {/* <Img
        src={LOGO_URL}
        width="100"
        height="21"
        alt="AntiExcel"
        className="mx-auto my-5"
      /> */}
      <Heading>
        {session?.user.name?.split(' ')[0]}, We&apos;re sorry to hear you
        canceled your subscription.
      </Heading>
      <Text>
        We hope this message finds you well. We would like to acknowledge that
        we have received your request to cancel your subscription with
        AntiExcel.
      </Text>
      <Text>
        We appreciate your decision and you can get back to PRO anytime you
        want.
      </Text>
      <Text>
        We genuinely value your feedback, and if there&apos;s anything specific
        that led to your decision to cancel, we would appreciate hearing about
        it.
      </Text>
      <Text>
        Your input helps us improve our services for the benefit of all our
        customers.
      </Text>
      <Text>
        Once again, we thank you for choosing AntiExcel. If your circumstances
        change, and you find yourself in need of our an unlimited plan again,
        we&apos;d be more than happy to welcome you back.
      </Text>
      <Text>Best regards,</Text>
      <Text>Customer Support Team, AntiExcel</Text>
    </Email>
  );
}

export default CanceledSubscriptionEmail;
