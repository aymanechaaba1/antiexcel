import { Img, Text } from '@react-email/components';
import Email from './Email';
import { LOGO_URL } from '@/lib/config';

function SuspendedSubscriptionEmail() {
  return (
    <Email>
      <Img
        src={LOGO_URL}
        width="100"
        height="21"
        alt="AntiExcel"
        className="mx-auto my-5"
      />
      <Text>
        This email is a confirmation of suspension of your subscription.
      </Text>
      <Text>
        We're sorry to hear that but you still have the basic version to still
        explore and take advantage of our services.
      </Text>
      <Text>You can get back to PRO anytime you want.</Text>
      <Text>--- AntiExcel Team</Text>
    </Email>
  );
}

export default SuspendedSubscriptionEmail;
