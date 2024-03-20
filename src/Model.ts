export type Account = {
  id: number;
  brojRacuna: string;
  vlasnik: number;
  stanje: number;
  raspolozivoStanje: number;
  zaposledni: number;
  datumKreiranja: number;
  datumIsteka: number;
  currency: string;
  aktivan: boolean;
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

export type ExchangeRate = {
  par: string;
  kurs: number;
};

export type PrenosSredstava = {
  racunPosiljaoca: 0;
  racunPrimaoca: 0;
  iznos: 0;
};

//iznos/prvavaluta*drugavaluta*provizija

// export type ExchangeRate = {
//   valuta: string;
//   kupovni: number;
//   prodajni: number;
// };
