import PlanDetails from '@/components/PlanDetails';
import Section from '@/components/Section';

function PlanPage() {
  return (
    <Section title="Review your plan" className="space-y-3">
      <PlanDetails />
    </Section>
  );
}

export default PlanPage;
