import { FC } from "react";

import Calculator from "../../components/calculator/Calculator";

import "./MainPage.scss";

import PaymentChart from "../../chart/PaymentChart";
import PaymentSchedule from "../../components/payment-schedule/PaymentSchedule";

const MainPage: FC = () => {
  return (
    <main className="main-page">
      <header className="main-header">
        <div className="main-title">
          <h1>Кредитный калькулятор Т1</h1>
        </div>
        <div className="main-description">
          <p>
            Наш продукт - это кредитный трекер открытых позиций и калькулятор,
            для физических лиц. Приложение рассчитывает графики платежей по
            кредиту, и сохраняет их для авторизованных пользователей. Данные
            можно посмотреть в личном кабинете приложения, или получить в виде
            JSON, отправив запрос с другого сервиса. Мы имеем частично открытое
            api, предоставляющее возможность любому желающему интегрировать наш
            сервис в свое приложение.
          </p>
        </div>
      </header>
      <Calculator />
      <PaymentChart />
      <PaymentSchedule />
    </main>
  );
};

export default MainPage;
