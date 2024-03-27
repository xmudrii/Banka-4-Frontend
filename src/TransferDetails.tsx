import { Button, Container, Grid, Typography } from "@mui/material";
import ".//ExchangePage.css";
import { Account, User } from "./utils/types";

const provizija = 0.005;
const kurs = 117.6926;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;
  saRacuna: Account | undefined;
  naRacun: Account | undefined;
  user: User | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
  saRacuna,
  naRacun,
  user,
}: Props) => {
  return (
    <Container className="main-section-details-div">
      <Grid className="details-section">
        <Typography>Platilac:</Typography>
        <Typography className="platilac">
          {user?.ime} {user?.prezime}, {user?.adresa}
        </Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Sa racuna:</Typography>
        <Typography>{saRacuna?.brojRacuna}</Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Iznos:</Typography>
        <Typography>
          {iznos} {saRacuna?.currency}
        </Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Na racun:</Typography>
        <Typography>{naRacun?.brojRacuna}</Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Iznos:</Typography>
        <Typography>
          {iznos && parseInt(iznos, 10) * kurs} {naRacun?.currency}
        </Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Kurs:</Typography>
        <Typography>{kurs}</Typography>
      </Grid>
      <Grid className="details-section">
        <Typography>Provizija:</Typography>
        <Typography>{provizija}</Typography>
      </Grid>
      <Grid className="buttons">
        <Button className="button" onClick={() => setDetaljiTransfera(false)}>
          Ponisti
        </Button>
        <Button className="button">Potvrdi</Button>
      </Grid>
    </Container>
  );
};
export default TransferDetails;
