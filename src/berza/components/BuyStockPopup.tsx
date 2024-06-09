import { Fragment, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Context } from 'App';
import { getMe } from 'utils/getMe';
import { makeApiRequest } from 'utils/apiRequest';
import { UserRoutes } from 'utils/types';

const TipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 2px;
`
interface BuyStockPopupProps {
  ticker?: string; // Optional string prop
}


const BuyStockPopup: React.FC<BuyStockPopupProps> = ({ ticker }) => {
  const [open, setOpen] = useState(false);
  const [kolicina, setKolicina] = useState('')
  const [limit, setLimit] = useState('')
  const [stop, setStop] = useState('')
  const [margin, setMargin] = useState(false)
  const [allOrNone, setAllOrNone] = useState(false)

  const ctx = useContext(Context);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = async () => {

    const data = {
      "userId": getMe()?.id,
      "ticker": ticker,
      "quantity": kolicina,
      "limit": limit,
      "stop": stop,
      "allOrNone": allOrNone,
      "margin": margin,
      "action": "BUY"
    }
    try {
      const result = await makeApiRequest(UserRoutes.place_order, 'POST', data, false, false, ctx);
      console.log(result);
      ctx?.setErrors(["Our Success: Uspesno kupljeno"])
    }
    catch (e) {
      ctx?.setErrors(["Our Error: Neuspesno kupljeno"])
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Buy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Kupi akciju " + (ticker || "")}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Kolicina"
            name="kolicina"
            variant="outlined"
            value={kolicina}
            onChange={(e) => { setKolicina(e.target.value) }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Limit"
            name="limit"
            variant="outlined"
            value={limit}
            onChange={(e) => { setLimit(e.target.value) }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stop"
            name="stop"
            variant="outlined"
            value={stop}
            onChange={(e) => { setStop(e.target.value) }}
            fullWidth
            margin="normal"
          />
          <TipWrapper>
            <Typography variant='body2'>* Ako su oba 0 onda se radi Market Order</Typography>
            <Typography variant='body2'>* Ako je jedan stavljen, a drugi 0, radi se šta ste odabrali (Limit ili Stop Order)</Typography>
            <Typography variant='body2'>* Ako su oba stavljena, radi se Stop-Limit order</Typography>
          </TipWrapper>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={margin} onChange={(e) => setMargin(e.target.checked)} />} label="Marign" />
            <FormControlLabel control={<Checkbox checked={allOrNone} onChange={(e) => setAllOrNone(e.target.checked)} />} label="AllOrNone" />
          </FormGroup>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose}>Izlaz</Button>
          <Button onClick={handleBuy} autoFocus>
            Kupi
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default BuyStockPopup