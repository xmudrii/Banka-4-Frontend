import ".//Header.css";

type Props = {
  firstName: string;
  lastName: string;
};

const Header = ({ firstName, lastName }: Props) => {
  return (
    <div className="header">
      <div className="user-info">
        <span>{`${firstName} ${lastName}`}</span>
        {/* Prazna user ikona */}
        <div className="user-icon"></div>
      </div>
      <div className="navigation-bar">
        <a href="/">Početna</a>
        <a href="/accounts">Računi</a>
        <a href="/payments">Plaćanja</a>
        <a href="/verification">Verifikacija</a>
      </div>
    </div>
  );
};

export default Header;
