import {
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getSubtotal } from "../feature/utils";

function ReviewForm() {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const address = useSelector((state) => state.checkout?.address);
  const addresses = address ? Object.values(address) : [];
  const payment = useSelector((state) => state.checkout?.payment);

  const payments = payment
    ? [
        { name: "Card type", detail: "Visa" },
        { name: "Card Number", detail: payment.cardNumber },
        { name: "Card Holder", detail: payment.name },
        { name: "Expiry Date", detail: payment.expDate },
        { name: "CVV", detail: payment.cvv },
      ]
    : [];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cart?.map(({ product, quantity }) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 500,
                },
                "& .MuiListItemText-secondary": {
                  fontSize: theme.spacing(2),
                },
              }}
              primary={product.title}
              secondary={`Qty: ${quantity}`}
            />
            <Typography variant="body2">
              {getSubtotal([{ product, quantity }])?.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: 500,
              },
              "& .MuiListItemText-secondary": {
                fontSize: theme.spacing(2),
              },
            }}
            primary={"Total"}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getSubtotal(cart)?.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid2 container spacing={2}>
        <Grid2 item="true" direction={"column"} size={{ xs: 12, sm: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {addresses.join(",")}
          </Typography>
        </Grid2>
        <Grid2
          item="true"
          container
          direction={"column"}
          size={{ xs: 12, sm: 6 }}
        >
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid2 variant="h6" container sx={{ mt: 2 }}>
            {payments.map(({ name, detail }) => (
              <>
                <Grid2 size={{ xs: 6 }} key={name} item="true">
                  <Typography gutterBottom>{name}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }} key={detail} item="true">
                  <Typography gutterBottom>{detail}</Typography>
                </Grid2>
              </>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default ReviewForm;
