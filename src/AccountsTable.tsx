import { Account } from "./Model";
import "./Table.css";

type Props = {
  accounts: Account[];
};

const AccountsTable = ({ accounts }: Props) => {
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
            <tr key={account.number}>
              <td>{account.number}</td>
              <td>{account.balance}</td>
              <td>{account.availableBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AccountsTable;
