// import { Button, Img, Link, Text } from '@react-email/components';
// import Email from './Email';
// import { LOGO_URL } from '@/lib/config';
// import { Session } from 'next-auth';
// import { getUrl } from '@/lib/utils';

// function BecomeProEmail({ session }: { session: Session | null }) {
//   return (
//     <Email>
//       <Img
//         src={LOGO_URL}
//         width="100"
//         height="21"
//         alt="AntiExcel"
//         className="mx-auto my-5"
//       />
//       <Text>
//         {session?.user.name?.split(' ')[0]}, You&apos;ve reached the limit,
//         expand your membership and become a PRO.
//       </Text>
//       <Text>You will have unlimited students.</Text>
//       <Text>You will have unlimited teachers.</Text>
//       <Text>
//         You will have access to real-time data of students and teachers.
//       </Text>
//       <Button className="bg-purple-500 rounded-md py-2 px-5 text-white font-medium">
//         <Link href={`${getUrl()}/#pricing`} className="text-white">
//           Become a PRO ✨!
//         </Link>
//       </Button>
//     </Email>
//   );
// }

// export default BecomeProEmail;
