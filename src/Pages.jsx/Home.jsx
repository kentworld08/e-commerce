import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../feature/cart-slice";
import { fetchAllProducts } from "../feature/products-slice";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchterm");
  const category = searchParams.get("category");
  const theme = useTheme();
  const state = useSelector((state) => state.products);
  const { value: products, loading } = state ?? {};
  const dispatch = useDispatch();

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category === category)
      : products;
  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid2 container spacing={3}>
        {filteredProducts.map(
          ({ title, id, price, description, rating, image }) => (
            <Grid2 item="true" key={id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  padding: theme.spacing(2, 0),
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="image"
                  sx={{
                    alignSelf: "center",
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "contain",
                    pt: theme.spacing(),
                  }}
                  image={image}
                  alt={title}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",
                      "-webkit-box-orient": "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography fontSize="large">{price}</Typography>
                  <Rating readOnly precision={0.5} value={rating.rate} />
                </CardContent>
                <CardActions sx={{ alignSelf: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="add to shopping cart"
                    onClick={() =>
                      addProductToCart({
                        title,
                        id,
                        price,
                        description,
                        rating,
                        image,
                      })
                    }
                  >
                    <AddShoppingCartIcon />{" "}
                    <Typography marginLeft={1}>Add to cart</Typography>
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          )
        )}
      </Grid2>
    </Container>
  );
}

export default Home;
