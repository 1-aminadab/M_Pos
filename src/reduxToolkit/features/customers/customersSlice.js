import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [
        {
          name: 'Amanuel Kebede',
          tin: '154004876579',
        },
        {
          name: 'Habtom Abebe',
          tin: '148790046997',
        },
        {
          name: 'Yeshi Amare',
          tin: '317897489546',
        },
        {
          name: 'Samuel Bekele',
          tin: '416578771346',
        },
        {
          name: 'Baye Shumeta',
          tin: '484016746879',
        },
        {
          name: 'Ahmed Mohammad',
          tin: 'TT1016746879',
        },
        {
          name: 'Emmona Takele',
          tin: 'T014016746879',
        },
      ]
}

export const customerListSlice = createSlice({
    name: 'customerList',
    initialState,
    reducers: {
        setCustomerList: (state, action) => {
            state.customers = action.payload
        }
    }
})

export const { setCustomerList } = customerListSlice.actions;

export default customerListSlice.reducer