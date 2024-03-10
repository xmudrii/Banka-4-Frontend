import AccountsTable from "./AccountsTable";
import Header from "./Header";
import { Account, Transaction } from "./Model";
import TransactionsTable from "./TransactionsTable";

const UserHomePage = () => {
  const accounts: Account[] = [
    { number: "123456", balance: 1000, availableBalance: 800 },
    { number: "789012", balance: 500, availableBalance: 300 },
  ];

  const transactions: Transaction[] = [
    {
      senderAccountNumber: "123456",
      recipientName: "John Doe",
      recipientAccountNumber: "789012",
      amount: 200,
      referenceNumber: "TRX123",
      status: "Uspeh",
      timestamp: "2024-03-08 14:30:00",
    },
  ];

  return (
    <div>
      <Header firstName={"Sofija"} lastName={"Todorovic"} />
      <AccountsTable accounts={accounts} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default UserHomePage;
