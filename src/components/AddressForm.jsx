import React from "react";
import { Box, Grid2, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAddress } from "../feature/checkout-slice";

function AddressForm() {
  const address = useSelector((state) => state.checkout?.address);
  const dispatch = useDispatch();

  function updateAddress(e) {
    const { name, value } = e.target;
    dispatch(UpdateAddress({ [name]: value }));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Box component={"form"} onChange={updateAddress}>
        <Grid2 container spacing={3}>
          <Grid2 item="true" size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              defaultValue={address.firstName ?? ""}
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoFocus
              autoComplete="given-name"
              variant="standard"
            />{" "}
          </Grid2>
          <Grid2 item="true" size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              defaultValue={address.lastName ?? ""}
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid2>
          <Grid2 item="true" size={{ xs: 12 }}>
            <TextField
              required
              defaultValue={address.address1 ?? ""}
              id="address1"
              name="address1"
              label="Address Line 1"
              fullWidth
              autoComplete="shipping address-line 1"
              variant="standard"
            />
          </Grid2>
          <Grid2 item="true" size={{ xs: 12 }}>
            <TextField
              required
              defaultValue={address.address2 ?? ""}
              id="address2"
              name="address2"
              label="Address Line 2"
              fullWidth
              autoComplete="shipping address-line 2"
              variant="standard"
            />
          </Grid2>
          <Grid2 item="true" size={{ xs: 12 }}>
            <TextField
              required
              defaultValue={address.city ?? ""}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="city name"
              variant="standard"
            />
          </Grid2>
          <Grid2 item="true" size={{ xs: 12 }}>
            <TextField
              required
              defaultValue={address.zipCode ?? ""}
              id="zipCode"
              name="zipCode"
              label="Zip Code/Postal Code"
              fullWidth
              autoComplete="zip code"
              variant="standard"
            />
          </Grid2>
          <Grid2 item="true" sx={{ mb: 4 }} size={{ xs: 12 }}>
            <TextField
              required
              defaultValue={address.country ?? ""}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="country name"
              variant="standard"
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}

export default AddressForm;
