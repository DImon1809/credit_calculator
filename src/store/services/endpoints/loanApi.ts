import { serviceApi } from "../servicesApi";

import { ILoan } from "../types";

export const loanApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    calculate: builder.mutation<
      ILoan,
      {
        amount: number;
        interestRate: number;
        termInMonth: number;
      }
    >({
      query: (loan) => ({
        url: "/team21/api/v1/loan/calculate",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          amount: loan.amount,
          interestRate: loan.interestRate,
          termInMonth: loan.termInMonth,
        },
      }),
    }),

    save: builder.mutation<
      any,
      {
        amount: number;
        interestRate: number;
        termInMonth: number;
      }
    >({
      query: (loan) => ({
        url: "/team21/api/v1/loan/save",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          amount: loan.amount,
          interestRate: loan.interestRate,
          termInMonth: loan.termInMonth,
        },
      }),
    }),
  }),
});

export const { useCalculateMutation, useSaveMutation } = loanApi;
