import React from "react";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useTheme } from "@emotion/react";
import { getSubtotal } from "../feature/utils";
import { addToCart } from "../feature/cart-slice";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../feature/cart-slice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const subtotal = getSubtotal(cart)?.toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function updateQuantity(e, { product, quantity }) {
    const updatedQuantity = e.target.valueAsNumber;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  }

  function goToHome() {
    navigate("/");
  }
  function checkOutItem() {
    navigate("/checkout");
  }
  return (
    <Container sx={{ py: 8 }}>
      <Grid2 container spacing={2}>
        <Grid2 item container spacing={2} size={{ md: 8 }}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, rating, image } = product;

            return (
              <Grid2 item key={id} size={{ xs: 12 }}>
                <Card sx={{ display: "flex", py: 2 }}>
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{ width: theme.spacing(8) }}
                          value={quantity}
                          slotProps={{ min: 0, max: 10 }}
                          label="quantity"
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          onChange={(e) =>
                            updateQuantity(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
        <Grid2
          item
          container
          size={{ md: 4 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography variant="h4">subtotal</Typography>
              <Typography variant="h5">{subtotal}</Typography>
              {subtotal > 0 ? (
                <Button variant="contained" onClick={checkOutItem}>
                  Buy now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  Shop products
                </Button>
              )}
            </Card>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Cart;
