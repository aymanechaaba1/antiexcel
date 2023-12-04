interface BillingCycle {
  frequency: {
    interval_unit: string;
    interval_count: number;
  };
  tenure_type: string;
  sequence: number;
  total_cycles: number;
  pricing_scheme: {
    fixed_price: {
      currency_code: string;
      value: string;
    };
    version: number;
    create_time: string; // ISO 8601 datetime format
    update_time: string; // ISO 8601 datetime format
  };
}

interface TaxInfo {
  percentage: string;
  inclusive: boolean;
}

interface Plan {
  id: string;
  product_id: string;
  name: string;
  description: string;
  status: string;
  billing_cycles?: BillingCycle[];
  features: string[];
  payment_preferences?: {
    service_type: 'PREPAID' | 'CREDIT' | 'DEBIT' | 'UNKNOWN';
    auto_bill_outstanding: boolean;
    setup_fee: {
      currency_code: string;
      value: string;
    };
    setup_fee_failure_action: 'CONTINUE';
    payment_failure_threshold: 3;
  };
  quantity_supported?: boolean;
  taxes?: TaxInfo;
  create_time?: string; // ISO 8601 datetime format
  update_time?: string; // ISO 8601 datetime format
  links?: {
    href: string;
    rel: string;
    method: string;
  }[];
}
