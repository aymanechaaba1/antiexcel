import Section from '@/components/Section';
import SubscriptionActions from '@/components/SubscriptionActions';
import SubscriptionDetails from '@/components/SubscriptionDetails';

function SettingsPage() {
  return (
    <>
      <Section title="Review your Subscription" className="space-y-3">
        <SubscriptionDetails />
        <SubscriptionActions />
      </Section>
      <div></div>
    </>
  );
}

export default SettingsPage;
