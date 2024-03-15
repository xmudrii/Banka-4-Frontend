import { Transaction } from "./Model";
import "./Table.css";

type Props = {
  transactions: Transaction[];
};

const TransactionsTable = ({ transactions }: Props) => {
  return (
    <div className="tableDiv">
      <h2>Istorija Transakcija</h2>
      <table>
        <thead>
          <tr>
            <th>Račun pošiljaoca</th>
            <th>Naziv primaoca</th>
            <th>Račun primaoca</th>
            <th>Iznos</th>
            <th>Poziv na broj</th>
            <th>Status</th>
            <th>Datum i vreme transakcije</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.referenceNumber}>
              <td>{transaction.senderAccountNumber}</td>
              <td>{transaction.recipientName}</td>
              <td>{transaction.recipientAccountNumber}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.referenceNumber}</td>
              <td>{transaction.status}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionsTable;
