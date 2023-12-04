interface PlanLink {
  href: string;
  rel: string;
  method: string;
}

interface Plan {
  id: string;
  name: string;
  status: string;
  description: string;
  usage_type: string;
  create_time: string;
  links: PlanLink[];
}

interface PlansPayload {
  plans: Plan[];
  links: PlanLink[];
}
