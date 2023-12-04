export interface PaypalWebhookResponse {
  id: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
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
    plan: {
      curr_code: string;
      links: string[] | [];
      payment_definitions: [
        {
          type: string;
          frequency: string;
          frequency_interval: string;
          amount: {
            value: string;
          };
          cycles: string;
          charge_models: [
            {
              type: string;
              amount: {
                value: string;
              };
            },
            {
              type: string;
              amount: {
                value: string;
              };
            }
          ];
        },
        {
          type: 'REGULAR' | 'TRIAL';
          frequency: string;
          frequency_interval: string;
          amount: {
            value: string;
          };
          cycles: string;
          charge_models: [
            {
              type: string;
              amount: {
                value: string;
              };
            },
            {
              type: string;
              amount: {
                value: string;
              };
            }
          ];
        }
      ];
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
    agreement_details: {
      outstanding_balance: {
        value: string;
      };
      num_cycles_remaining: string;
      num_cycles_completed: string;
      final_payment_due_date: string;
      failed_payment_count: string;
    };
    description: string;
    state: string;
    links: [
      {
        href: string;
        rel: string;
        method: string;
      }
    ];
    start_date: string;
  };
  links: [
    {
      href: string;
      rel: string;
      method: string;
    },
    {
      href: string;
      rel: string;
      method: string;
    }
  ];
}
