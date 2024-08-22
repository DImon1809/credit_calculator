import { FC } from "react";

import Calculator from "../../components/calculator/Calculator";
import PaymentChart from "../../chart/PaymentChart";
import PaymentSchedule from "../../components/payment-schedule/PaymentSchedule";

import "./PersonalAccount.scss";

const PersonalAccount: FC = () => {
  return (
    <section className="personal-account">
      <Calculator />
      <PaymentChart />
      <PaymentSchedule />
    </section>
  );
};

export default PersonalAccount;
