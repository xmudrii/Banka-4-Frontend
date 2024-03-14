export enum UserPermissions {
  listanje_korisnika = 'listanje_korisnika',
  dodavanje_korisnika = 'dodavanje_korisnika',
  editovanje_korisnika = 'editovanje_korisnika',
  deaktiviranje_korisnika = 'deaktiviranje_korisnika',
  kreiranje_racuna = 'kreiranje_racuna',
  editovanje_racuna = 'editovanje_racuna',
  brisanje_racuna = 'brisanje_racuna',
}

export enum EmployeePermissions {
  listanje_korisnika = 'listanje_korisnika',
  dodavanje_korisnika = 'dodavanje_korisnika',
  editovanje_korisnika = 'editovanje_korisnika',
  deaktiviranje_korisnika = 'deaktiviranje_korisnika',
  kreiranje_racuna = 'kreiranje_racuna',
  editovanje_racuna = 'editovanje_racuna',
  brisanje_racuna = 'brisanje_racuna',
  listanje_radnika = 'listanje_radnika',
  dodavanje_radnika = 'dodavanje_radnika',
  editovanje_radnika = 'editovanje_radnika',
  deaktiviranje_radnika = 'deaktiviranje_radnika'
}

export type User = {
  ime: string;
  prezime: string;
  jmbg: string;
  datumRodjenja: string;
  pol: string;
  adresa: string;
  email: string;
  brojTelefona: string;
  permisije: UserPermissions[];
}

export type UserListProps = {
  users: User[];
}

export type UserPageProps = {
  user: User;
}

export enum AccountType {
  tekuci = 'tekuci',
  stedni = 'stedni',
  penzionerski = 'penzionerski',
  racun_za_mlade = 'racun_za_mlade',
  devizni = 'devizni',
  poslovni = 'poslovni '
}

export type Account = {
  brojRacuna: string;
  stanje: number;
  raspolozivoStanje: number;
  datumKreiranja: string;
  datumIsteka: string;
  currency: string;
  vrstaRacuna: string;
  aktivan: boolean;
  kamatnaStopa?: string;
  odrzavanjeRacuna?: string;
  vlasnik?: number,
  zaposleni?: number
}

export type AccountBasicInfo = {
brojRacuna: string;
stanje: number;
}

export type AccountListProps = {
  accounts: Account[];
}

export type AccountPageProps = {
  account: Account;
}

export type Employee = {
  ime: string;
  prezime: string;
  jmbg: string;
  username: string;
  datumRodjenja: string;
  pol: string;
  adresa: string;
  email: string;
  brojTelefona: string;
  pozicija: string;
  departman: string;
  password: string;
  permisije: number;
}

export type EmployeeListProps = {
  employees: Employee[];
}

export type Company = {
  naziv: string;
  brojTelefona: string;
  broj_faksa: string;
  pib: string;
  maticni_broj: string;
  sifra_delatnosti: string;
  registarski_broj: string;
}

export type CompanyListProps = {
  companies: Company[];
}
