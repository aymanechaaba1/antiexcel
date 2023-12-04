type PayPalSubscriptionEvent = {
  id: string;
  create_time: string; // UTC timestamp in "yyyy-MM-ddTHH:mm:ssZ" format
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
    agreement_details: {
      outstanding_balance: {
        value: string;
      };
      num_cycles_remaining: string;
      num_cycles_completed: string;
      next_billing_date: string; // UTC timestamp in "yyyy-MM-ddTHH:mm:ssZ" format
      last_payment_date: string; // UTC timestamp in "yyyy-MM-ddTHH:mm:ssZ" format
      last_payment_amount: {
        value: string;
      };
      final_payment_due_date: string; // UTC timestamp in "yyyy-MM-ddTHH:mm:ssZ" format
      failed_payment_count: string;
    };
    description: string;
    links: {
      href: string;
      rel: string;
      method: string;
    }[];
    id: string;
    shipping_address: {
      recipient_name: string;
      line1: string;
      line2: string;
      city: string;
      state: string;
      postal_code: string;
      country_code: string;
    };
    state: string;
    plan: {
      curr_code: string;
      links: any[]; // This can be a more specific type based on actual structure
      payment_definitions: {
        type: string;
        frequency: string;
        frequency_interval: string;
        amount: {
          value: string;
        };
        cycles: string;
        charge_models: {
          type: string;
          amount: {
            value: string;
          };
        }[];
      }[];
      merchant_preferences: {
        setup_fee: {
          value: string;
        };
        auto_bill_amount: string;
        max_fail_attempts: string;
      };
    };
    payer: {
      payment_method: string;
      status: string;
      payer_info: {
        email: string;
        first_name: string;
        last_name: string;
        payer_id: string;
        shipping_address: {
          recipient_name: string;
          line1: string;
          line2: string;
          city: string;
          state: string;
          postal_code: string;
          country_code: string;
        };
      };
    };
    start_date: string; // UTC timestamp in "yyyy-MM-ddTHH:mm:ssZ" format
  };
  links: {
    href: string;
    rel: string;
    method: string;
    encType?: string;
  }[];
  event_version: string;
};
