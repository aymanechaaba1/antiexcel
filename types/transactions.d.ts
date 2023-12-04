type Transaction = {
  id: string;
  status: string;
  payer_email: string;
  payer_name: {
    given_name: string;
    surname: string;
  };
  amount_with_breakdown: {
    gross_amount: {
      currency_code: string;
      value: string;
    };
    fee_amount: {
      currency_code: string;
      value: string;
    };
    net_amount: {
      currency_code: string;
      value: string;
    };
  };
  time: string;
};
