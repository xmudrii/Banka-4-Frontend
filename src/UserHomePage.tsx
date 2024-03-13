import { useEffect, useState } from "react";
import AccountsTable from "./AccountsTable";
import Header from "./Header";
import { Account, Transaction } from "./Model";
import TransactionsTable from "./TransactionsTable";
const korisnikId = 123;
const authToken = "Bearer YOUR_AUTH_TOKEN";

// const transactions: Transaction[] = [
//   {
//     senderAccountNumber: "123456",
//     recipientName: "John Doe",
//     recipientAccountNumber: "789012",
//     amount: 200,
//     referenceNumber: "TRX123",
//     status: "Uspeh",
//     timestamp: "2024-03-08 14:30:00",
//   },
// ];

// const accounts: Account[] = [
//   { number: "123456", balance: 1000, availableBalance: 800 },
//   { number: "789012", balance: 500, availableBalance: 300 },
// ];

const UserHomePage = () => {
  //account za prikaz komponentu u kojoj se prikazuje pojedinacan racun
  const [account, setAccount] = useState<Account>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `/transactions/getAllTransactionsByKorisnikId/${korisnikId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `/racuni/nadjiRacuneKorisnika/${korisnikId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setAccounts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

  return (
    <div>
      <Header firstName={"Sofija"} lastName={"Todorovic"} />
      <AccountsTable accounts={accounts} setAccount={setAccount} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default UserHomePage;
