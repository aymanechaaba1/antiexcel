import { Heading, Hr, Img, Link, Section, Text } from '@react-email/components';
import Email from './Email';
import { LOGO_URL } from '@/lib/config';
import { User } from 'next-auth';
import { getUrl } from '@/lib/utils';

interface EmailTemplateProps {
  user: User;
}

export const WelcomeEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  user,
}) => (
  <Email>
    <Section>
      <Img
        src={LOGO_URL}
        width="100"
        height="21"
        alt="AntiExcel"
        className="mx-auto my-5"
      />
      <Hr className="border border-[#e6ebf1] my-5 mx-0" />
      <Heading as="h1" className="font-medium">
        {user.name}, Welcome to AntiExcel 👋!
      </Heading>
      <Text>
        We&apos;re happy to use this amazing tool to manage your school data.
      </Text>
      <Text>
        You&apos;re on the FREE Plan now, enjoy the free version and you can
        upgrade whenever you need it.
      </Text>
      <Text className="">— AntiExcel team</Text>
      <Hr className="border border-[#e6ebf1] my-5 mx-0" />
      <Link
        href={`${getUrl()}/dashboard`}
        className="text-white bg-purple-500 px-5 py-3 rounded-md font-medium"
      >
        Go to Dashboard
      </Link>
      <Hr className="border border-[#e6ebf1] my-5 mx-0" />
      <Text className="text-xs text-gray-500">
        AntiExcel, Rabat, Morocco 🇲🇦
      </Text>
    </Section>
  </Email>
);

export default WelcomeEmail;
