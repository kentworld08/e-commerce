import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProductsCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
