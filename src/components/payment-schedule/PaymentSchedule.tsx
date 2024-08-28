import { FC } from "react";

import "./PaymentSchedule.scss";

import { testData } from "../../testData";

const PaymentSchedule: FC = () => {
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

        <tbody className="tbody">
          {testData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.payOfInter}</td>
              <td>{row.principal}</td>
              <td>{row.perMonth}</td>
              <td>{row.repayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSchedule;
