import { Account } from "./Model";
import "./Table.css";

type Props = {
  accounts: Account[];
  setAccount: (account: Account) => void;
};

const AccountsTable = ({ accounts, setAccount }: Props) => {
  return (
    <div className="tableDiv">
      <h2>Lista Računa</h2>
      <table>
        <thead>
          <tr>
            <th>Broj</th>
            <th>Stanje</th>
            <th>Raspoloživo stanje</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.brojRacuna} onClick={() => setAccount(account)}>
              <td>{account.brojRacuna}</td>
              <td>{account.stanje}</td>
              <td>{account.raspolozivoStanje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AccountsTable;
