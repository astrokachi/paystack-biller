export enum TransactionType {
  BILL = 'Bill', // When a trusted friend bills the trustor's card
  REPAYMENT = 'Repayment', // When the trustor repays the trustee
}

export enum TransactionStatus {
  PENDING = 'Pending', // Transaction initiated, awaiting processing/approval
  SUCCESSFUL = 'Successful', // Transaction completed successfully
  FAILED = 'Failed',     // Transaction failed (e.g., card declined)
  REFUNDED = 'Refunded', // Transaction was refunded
  OVERDUE = 'Overdue',   // For repayment transactions that are past due
}
