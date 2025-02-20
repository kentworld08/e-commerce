import { Box, Grid2, TextField, Typography } from "@mui/material";
import { UpdatePayment } from "../feature/checkout-slice";
import { useDispatch, useSelector } from "react-redux";

function PaymentForm() {
  const payment = useSelector((state) => state.checkout?.payment);

  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(UpdatePayment({ [name]: value }));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Box component={"form"} onChange={handleChange}>
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <TextField
              variant="standard"
              required
              defaultValue={payment.name ?? ""}
              name="name"
              id="name"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <TextField
              variant="standard"
              required
              defaultValue={payment.cardNumber ?? ""}
              name="cardNumber"
              id="cardNumber"
              label="Card Number"
              fullWidth
              autoComplete="cc-number"
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <TextField
              variant="standard"
              required
              defaultValue={payment.expDate ?? ""}
              name="expDate"
              id="expDate"
              label="Expiry Date"
              fullWidth
              autoComplete="cc-expDate"
            />
          </Grid2>
          <Grid2 item sx={{ mb: 4 }} size={{ xs: 12, md: 6 }}>
            <TextField
              variant="standard"
              required
              defaultValue={payment.cvv ?? ""}
              name="cvv"
              id="cvv"
              label="CVV"
              type="password"
              fullWidth
              autoComplete="cc-csc"
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}

export default PaymentForm;
