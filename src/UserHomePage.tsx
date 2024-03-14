import { useEffect, useState } from "react";
import AccountsTable from "./AccountsTable";
import Header from "./Header";
import { Account } from "./Model";
import { makeGetRequest } from "./utils/apiRequest";
const korisnikId = 1;

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
  const [accounts, setAccounts] = useState<Account[]>([]);
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  // const fetchTransactions = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://api.stamenic.work:8080/api/transactions/getAllTransactionsByKorisnikId/${korisnikId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NDU5NTIsImlhdCI6MTcxMDQxNzE1Mn0.TyfuP9lAVdIUoAVBgaGpbGk-zodjP9P8JSLk_CXCkhVnqRuIbnCkHGas798VDOVPEijW_8KsKNRGRwNQLp-QAQ`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     setTransactions(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchAccounts = async () => {
    try {
      const data = await makeGetRequest(`racuni/nadjiRacuneKorisnika/${korisnikId}`)
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // fetchTransactions();
    fetchAccounts();
  }, []);

  return (
    <div>
      <Header firstName={"Sofija"} lastName={"Todorovic"} />
      <AccountsTable accounts={accounts} setAccount={setAccount} />
      {/* <TransactionsTable transactions={transactions} /> */}
    </div>
  );
};

export default UserHomePage;
