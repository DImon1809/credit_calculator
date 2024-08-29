import { FC } from "react";

import "./PaymentSchedule.scss";

import { testData } from "../../testData";

import { IPayment } from "../../store/services/types";

export interface IPaymentSchedule {
  tableData: IPayment[];
}

const PaymentSchedule: FC<IPaymentSchedule> = ({ tableData }) => {
  return (
    <div className="payment-schedule">
      <table className="table">
        <thead className="thead">
          <tr>
            <td>Год/месяц</td>
            <td>Оплата процентов</td>
            <td>Основной долг</td>
            <td>Платеж в месяц</td>
            <td>Остаток погашения</td>
          </tr>
        </thead>

        <tbody className={tableData.length > 15 ? "tbody long" : "tbody"}>
          {tableData.length ? (
            tableData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.interest}</td>
                <td>{row.paymentAmount}</td>
                <td>{row.principal}</td>
                <td>{row.remainingBalance}</td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSchedule;
