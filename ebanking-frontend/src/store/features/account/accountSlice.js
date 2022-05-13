import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [
    {
      firstname: 'Zeeshan',
      lastname: 'Mehar',
      phone: '03334411333',
      username: 'ZeeshanMehar',
      email: 'zeeshan.mehar@gmail.com',
      actype: '1',
      password: 'Zeeshan@Mehar1',
      confirmpassword: 'Zeeshan@Mehar1',
      pin: '123456',
      confirmpin: '123456',
      balance: 1000,
      acnumber: 2780944575,
    },
  ],
  loggedUser: undefined,
  destAccout: undefined,
  transactionHistory: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts = [...state.accounts, action.payload];
    },
    usernameLogin: (state, action) => {
      const data = action.payload;
      state.loggedUser = data;
    },
    acNumberLogin: (state, action) => {
      const data = action.payload;
      state.loggedUser = data;
    },
    logoutUser: (state, action) => {
      state.loggedUser = undefined;
    },
    depositFunds: (state, action) => {
      const data = action.payload;
      state.loggedUser = {
        ...state.loggedUser,
        currentAccountBalance: Number(
          Number(
            Number(state.loggedUser?.currentAccountBalance) *
              (data?.currency === 'GBP' ? 1 : 1.2)
          ) + Number(data?.ammount)
        ).toFixed(2),
      };
      // state.accounts = [
      //   ...state.accounts?.map((ac) =>
      //     ac?.accountNumberGenerated == data.acnumber
      //       ? {
      //           ...ac,
      //           balance: Number(
      //             Number(
      //               Number(ac?.currentAccountBalance) *
      //                 (data?.currency === 'GBP' ? 1 : 1.2)
      //             ) + Number(data?.ammount)
      //           ).toFixed(2),
      //         }
      //       : { ...ac }
      //   ),
      // ];
      state.transactionHistory = [
        ...state.transactionHistory,
        {
          from: '',
          to: data.acnumber,
          ammount: data?.ammount,
          type: 'Deposit',
          currency: data?.currency,
          date: Date.now().toString(),
          balance: state.accounts?.find((ac) => ac?.acnumber == data.acnumber)
            ?.balance,
        },
      ];
      // state.loggedUser = state.accounts?.find(
      //   (ac) => ac?.acnumber === data.acnumber
      // );
    },
    withdrawFunds: (state, action) => {
      const data = action.payload;
      state.loggedUser = {
        ...state.loggedUser,
        currentAccountBalance: Number(
          Number(
            Number(state.loggedUser?.currentAccountBalance) *
              (data?.currency === 'GBP' ? 1 : 1.2)
          ) - Number(data?.ammount)
        ).toFixed(2),
      };
      // state.accounts = [
      //   ...state.accounts?.map((ac) =>
      //     ac?.acnumber == data.acnumber
      //       ? {
      //           ...ac,
      //           balance: Number(
      //             Number(
      //               Number(ac?.balance) * (data?.currency === 'GBP' ? 1 : 1.2)
      //             ) - Number(data?.ammount)
      //           ).toFixed(2),
      //         }
      //       : { ...ac }
      //   ),
      // ];
      state.transactionHistory = [
        ...state.transactionHistory,
        {
          from: data.acnumber,
          to: '',
          ammount: data?.ammount,
          type: 'Withdrawal',
          currency: data?.currency,
          date: Date.now().toString(),
          balance: state.accounts?.find((ac) => ac?.acnumber == data.acnumber)
            ?.balance,
        },
      ];
      // state.loggedUser = state.accounts?.find(
      //   (ac) => ac?.acnumber === data.acnumber
      // );
    },
    validateDest: (state, action) => {
      const data = action.payload;

      state.destAccout = data;
    },
    transferFunds: (state, action) => {
      const data = action.payload;
      console.log({ data });
      state.loggedUser = {
        ...state.loggedUser,
        currentAccountBalance: Number(
          Number(
            Number(state.loggedUser?.currentAccountBalance) *
              (data?.currency === 'GBP' ? 1 : 1.2)
          ) - Number(data?.ammount)
        ).toFixed(2),
      };
      // state.accounts = [
      //   ...state.accounts?.map((ac) =>
      //     ac?.acnumber == data.src_acnumber
      //       ? {
      //           ...ac,
      //           balance: Number(
      //             Number(
      //               Number(ac?.balance) * (data?.currency === 'GBP' ? 1 : 1.2)
      //             ) - Number(data?.ammount)
      //           ).toFixed(2),
      //         }
      //       : { ...ac }
      //   ),
      // ];
      // state.transactionHistory = [
      //   ...state.transactionHistory,
      //   {
      //     from: data.src_acnumber,
      //     to: data.dest_acnumber,
      //     ammount: data?.ammount,
      //     type: 'Transfer',
      //     currency: data?.currency,
      //     date: Date.now().toString(),
      //     balance: state.accounts?.find(
      //       (ac) => ac?.acnumber == data.src_acnumber
      //     )?.balance,
      //   },
      // ];
      state.destAccout = {
        ...state.destAccout,
        currentAccountBalance: Number(
          Number(
            Number(state.destAccout?.currentAccountBalance) *
              (data?.currency === 'GBP' ? 1 : 1.2)
          ) + Number(data?.ammount)
        ).toFixed(2),
      };
      // state.accounts = [
      //   ...state.accounts?.map((ac) =>
      //     ac?.acnumber == data.dest_acnumber
      //       ? {
      //           ...ac,
      //           balance: Number(
      //             Number(
      //               Number(ac?.balance) * (data?.currency === 'GBP' ? 1 : 1.2)
      //             ) + Number(data?.ammount)
      //           ).toFixed(2),
      //         }
      //       : { ...ac }
      //   ),
      // ];
      // state.transactionHistory = [
      //   ...state.transactionHistory,
      //   {
      //     to: data.src_acnumber,
      //     from: data.dest_acnumber,
      //     ammount: data?.ammount,
      //     type: 'Transfer',
      //     currency: data?.currency,
      //     date: Date.now().toString(),
      //     balance: state.accounts?.find(
      //       (ac) => ac?.acnumber == data.dest_acnumber
      //     )?.balance,
      //   },
      // ];
      // state.loggedUser = state.accounts?.find(
      //   (ac) => ac?.acnumber == data.src_acnumber
      // );
      state.destAccout = undefined;
    },
  },
});

export const {
  addAccount,
  usernameLogin,
  acNumberLogin,
  logoutUser,
  depositFunds,
  withdrawFunds,
  validateDest,
  transferFunds,
} = accountSlice.actions;

export default accountSlice.reducer;
