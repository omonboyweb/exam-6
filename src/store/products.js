import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      //   state.products.push(action.payload); // har safar bittadan qo‘shadi
    },
    deletePro: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    deleteSubCategory: (state, action) => {
      const { productId, subId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.subCategory = product.subCategory.filter(
          (sub) => sub.id !== subId
        );
      }
    },
    addSubCategory: (state, action) => {
      const { parentId, newSubCategory } = action.payload;
      state.products = state.products.map((product) =>
        product.id === parentId
          ? {
              ...product,
              subCategory: [...(product.subCategory || []), newSubCategory],
            }
          : product
      );
    },
  },
});

export const { addCategory, deletePro, deleteSubCategory, addSubCategory } =
  productsSlice.actions;
export default productsSlice.reducer;
