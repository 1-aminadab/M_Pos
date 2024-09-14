import {configureStore} from '@reduxjs/toolkit';
import productListReducer from './features/product/productListSlice';
import draftItemReducer from './features/draftItems/draftItemSlice';
import trackChangeReducer from './features/change/trackChangeSlice';

export const store = configureStore({
  reducer: {
    product: productListReducer,
    draftItem: draftItemReducer,
    change: trackChangeReducer,
  },
});
