export type Account = {
  number: string;
  balance: number;
  availableBalance: number;
};

export type Transaction = {
  senderAccountNumber: string;
  recipientName: string;
  recipientAccountNumber: string;
  amount: number;
  referenceNumber: string;
  status: "U obradi" | "Uspeh" | "Neuspeh";
  timestamp: string;
};
