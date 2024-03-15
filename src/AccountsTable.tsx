import { Account } from "./Model";
import "./Table.css";
import PojedinacnaPlacanja from "./moduls/StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike"

type Props = {
  accounts: Account[];
  setAccount: (account: Account) => void;
};

const AccountsTable = ({ accounts, setAccount }: Props) => {

  const handleClick = (account: Account) => {
    console.log("Usao");

    // Sačuvaj podatke u Local Storage
    localStorage.setItem('selectedAccount', JSON.stringify(account));

    // Preusmeravanje na odgovarajuću stranicu
    // Ovde koristimo history.push da preusmerimo korisnika na odgovarajuću stranicu
    window.location.replace(`/stranica-za-pojedinacni-racun`);
};

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
            <tr key={account.brojRacuna} onClick={() => handleClick(account)}>
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
