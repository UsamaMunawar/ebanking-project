import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ebankingApi = createApi({
  reducerPath: 'ebankingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7238/',
    headers: {},
  }),
  endpoints: (builder) => ({
    allCurrencies: builder.mutation({
      query: () => ({
        url: 'all_currencies',
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: 'register_account',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: body,
      }),
    }),
    authByACNumber: builder.mutation({
      query: (body) => ({
        url: 'api/Accounts/authenticate_by_acnumber',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: body,
      }),
    }),
    authByUsername: builder.mutation({
      query: (body) => ({
        url: 'api/Accounts/authenticate_by_username',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: body,
      }),
    }),
    deposit: builder.mutation({
      query: (body) => ({
        url: `api/Transactions/deposit?AccountNumber=${body?.acnumber}&Ammount=${body?.ammount}&TransactionPin=123456&TransactionCurrency=${body?.currency}`,
        method: 'post',
      }),
    }),
    withdraw: builder.mutation({
      query: (body) => ({
        url: `api/Transactions/withdrawl?AccountNumber=${body?.acnumber}&Ammount=${body?.ammount}&TransactionPin=123456&TransactionCurrency=${body?.currency}`,
        method: 'post',
      }),
    }),
    transfer: builder.mutation({
      query: (body) => ({
        url: `api/Transactions/transfer-funds?FromAccount=${body?.src_acnumber}&ToAccount=${body?.dest_acnumber}&Ammount=${body?.ammount}&TransactionPin=123456&TransactionCurrency=${body?.currency}`,
        method: 'post',
      }),
    }),
    getAccountByAccountNumber: builder.mutation({
      query: (body) => ({
        url: `api/Accounts/get_by_account_number?accountNumber=${body}`,
        method: 'get',
      }),
    }),
    getTransactions: builder.mutation({
      query: (body) => ({
        url: 'all_transactions',
        method: 'get',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAuthByACNumberMutation,
  useAuthByUsernameMutation,
  useAllCurrenciesMutation,
  useDepositMutation,
  useWithdrawMutation,
  useTransferMutation,
  useGetAccountByAccountNumberMutation,
  useGetTransactionsMutation,
} = ebankingApi;
