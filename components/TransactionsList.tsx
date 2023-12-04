'use client';

import { formatDate } from '@/lib/utils';
import { useTransactionsStore } from '@/store/store';

function TransactionsList() {
  const { transactions } = useTransactionsStore((state) => state);

  if (transactions)
    return (
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between overflow-x-scroll gap-4 border rounded-lg px-4 py-2 w-full flex-1 shadow-md"
          >
            <p className="text-xs">{transaction.id}</p>
            <p className="text-xs text-purple-500">
              {`${transaction.amount_with_breakdown.gross_amount.currency_code} ${transaction.amount_with_breakdown.gross_amount.value}`}
            </p>
            <p
              className={`text-xs ${
                transaction.status === 'COMPLETED'
                  ? 'text-green-500'
                  : transaction.status === 'PENDING'
                  ? 'text-purple-500'
                  : 'text-red-500'
              }`}
            >
              {transaction.status}
            </p>
            <p className="text-xs text-gray-500">
              {' '}
              {formatDate(new Date(transaction.time), 'en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    );
  else return <p className="text-gray-500">No transactions.</p>;
}

export default TransactionsList;
