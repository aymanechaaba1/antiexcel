interface Subscription {
  id: string;
  plan_id: string;
  start_time: string; // ISO 8601 datetime format
  quantity: string;
  shipping_amount: {
    currency_code: string;
    value: string;
  };
  subscriber: {
    shipping_address: {
      name: {
        full_name: string;
      };
      address: {
        address_line_1: string;
        address_line_2: string;
        admin_area_2: string;
        admin_area_1: string;
        postal_code: string;
        country_code: string;
      };
    };
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
  };
  billing_info: {
    outstanding_balance: {
      currency_code: string;
      value: string;
    };
    cycle_executions: {
      tenure_type: string;
      sequence: number;
      cycles_completed: number;
      cycles_remaining: number;
      total_cycles: number;
    }[];
    last_payment: {
      amount: {
        currency_code: string;
        value: string;
      };
      time: string; // ISO 8601 datetime format
    };
    next_billing_time: string; // ISO 8601 datetime format
    failed_payments_count: number;
  };
  create_time: string; // ISO 8601 datetime format
  update_time: string; // ISO 8601 datetime format
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
  status: string;
  status_update_time: string; // ISO 8601 datetime format
}
