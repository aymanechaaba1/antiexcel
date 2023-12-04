export const product = {
  id: 'PROD-4G7772778N590674T',
  name: 'PRO Membership',
  description: 'PRO Membership',
  type: 'SERVICE',
  category: 'SOFTWARE',
  create_time: '2023-11-22T10:43:53Z',
  update_time: '2023-11-22T10:43:53Z',
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-4G7772778N590674T',
      rel: 'self',
      method: 'GET',
    },
    {
      href: 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-4G7772778N590674T',
      rel: 'edit',
      method: 'PATCH',
    },
  ],
};

export const plans: Plan[] = [
  {
    id: 'P-19eb15ce-9a9b-47b2-a451-4c994941c5b1',
    product_id: 'PROD-4G7772778N590674T',
    name: 'FREE Plan',
    status: 'ACTIVE',
    description: 'Give it a Try!',
    usage_type: 'LICENSED',
    features: [
      'Manage up to 3 students',
      'Manage up to 3 teachers',
      'Real-time students data',
    ],
  },
  {
    id: 'P-15386790JC4273459MVVQI6A',
    product_id: 'PROD-4G7772778N590674T',
    name: 'PRO Plan',
    status: 'ACTIVE',
    description: 'Unlock all features',
    usage_type: 'LICENSED',
    features: [
      'Manage Unlimited students',
      'Manage Unlimited teachers',
      'Real-time students data',
      'Real-time teachers data',
    ],
    billing_cycles: [
      {
        pricing_scheme: {
          version: 1,
          fixed_price: {
            currency_code: 'USD',
            value: '10.0',
          },
          create_time: '2023-12-02T10:18:32Z',
          update_time: '2023-12-02T10:18:32Z',
        },
        frequency: {
          interval_unit: 'MONTH',
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 12,
      },
    ],
    payment_preferences: {
      service_type: 'PREPAID',
      auto_bill_outstanding: true,
      setup_fee: {
        currency_code: 'USD',
        value: '10.0',
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
    taxes: {
      percentage: '10.0',
      inclusive: false,
    },
    quantity_supported: false,
    create_time: '2023-12-02T10:18:32Z',
    update_time: '2023-12-02T10:18:32Z',
  },
];
