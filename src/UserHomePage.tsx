import AccountsTable from "./AccountsTable";
import Header from "./Header";
import { Account } from "./Model";

const UserHomePage = () => {
  const accounts: Account[] = [
    { number: "123456", balance: 1000, availableBalance: 800 },
    { number: "789012", balance: 500, availableBalance: 300 },
  ];

  return (
    <div>
      <Header firstName={"Sofija"} lastName={"Todorovic"} />
      <AccountsTable accounts={accounts} />
    </div>
  );
};

export default UserHomePage;
