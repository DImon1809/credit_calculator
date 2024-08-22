import { FC, MouseEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../store/features/alertSlice";

import RangeInput from "../UI/range-input/RangeInput";

import "./Calculator.scss";

const Calculator: FC = () => {
  const dispatch = useDispatch();

  const [sumValue, setSumValue] = useState<string>("100 000 ₽");
  const [term, setTerm] = useState<string>("6 месяцев");

  const [alertButton, setAlertButton] = useState<boolean>(false);

  const handleSaveButton = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();

    !alertButton &&
      dispatch(
        toggleAlert({
          alertText: "Сначала необходимо зайти в функционал!",
          isAlert: true,
          isAuthAlert: true,
        })
      );

    setAlertButton(true);
  };

  useEffect(() => {
    if (alertButton) {
      setTimeout(() => {
        setAlertButton(false);
      }, 2000);
    }
  }, [alertButton]);

  return (
    <div className="calculator-wrapper">
      <div className="params-input-wrapper">
        <div className="calculator-title">
          <h1>Кредитный калькулятор</h1>
        </div>
        <form className="params-form">
          <RangeInput
            rangeText="Какую сумму желаете взять?"
            preId="sum"
            min="0"
            max="100"
            pointBegin="100 тыс ₽"
            pointMedium="20 млн ₽"
            pointEnd="40 млн ₽"
            isDate={false}
            externalValue={sumValue}
            setExternalValue={setSumValue}
          />

          <RangeInput
            rangeText="На какой срок желаете взять?"
            preId="term"
            min="0"
            max="100"
            pointBegin="6 месяцев"
            pointMedium="3 года 9 месяцев"
            pointEnd="7 лет"
            isDate={true}
            externalValue={term}
            setExternalValue={setTerm}
          />

          <div
            className={alertButton ? "save-button alert" : "save-button"}
            onClick={handleSaveButton}
          >
            <p>сохранить</p>
          </div>
        </form>
      </div>
      <div className="params-output-wrapper">
        <div className="result-sum-wrapper">
          <div className="result-title">
            <h4>Ежемесячный платеж составляет</h4>
          </div>
          <div className="result-sum">
            <h3>120 000 ₽</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
