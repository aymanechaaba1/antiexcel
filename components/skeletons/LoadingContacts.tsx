import Section from '../Section';

function LoadingContacts() {
  return (
    <Section title="Contacts List">
      <div className="w-20 h-5 rounded-lg bg-gray-900 animate-pulse" />
      <div className="space-y-4">
        <div className="grid grid-cols-4 md:grid-cols-6">
          <p className="font-bold text-gray-500">Avatar</p>
          <p className="font-bold text-gray-500">Name</p>
          <p className="font-bold text-gray-500 hidden md:grid">Email</p>
          <p className="font-bold text-gray-500 hidden md:grid text-right">
            Phone
          </p>
          <p className="font-bold text-gray-500 text-right">Relationship</p>
          <p className="justify-self-end font-bold text-gray-500">Students</p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {[...Array(24).keys()].map((i) => (
            <div className="w-20 h-5 rounded-lg dark:bg-gray-900 bg-gray-300 animate-pulse" />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default LoadingContacts;
