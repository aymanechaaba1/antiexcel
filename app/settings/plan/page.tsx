import PlanActions from '@/components/PlanActions';
import PlanDetails from '@/components/PlanDetails';
import Section from '@/components/Section';

function PlanPage() {
  return (
    <Section title="Review your plan" className="space-y-3">
      <PlanDetails />
      <PlanActions />
    </Section>
  );
}

export default PlanPage;
