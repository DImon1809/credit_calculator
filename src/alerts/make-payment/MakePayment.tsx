import { FC, MouseEvent, ChangeEvent, useState, useEffect } from "react";

import { RootType } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { togglePayment, toggleAlert } from "../../store/features/alertSlice";

import { toggleWrapper } from "../../store/features/gWrapperslice";

import LeaveCross from "../../components/UI/leave-cross/LeaveCross";
import "./MakePayment.scss";

const MakePayment: FC = () => {
  const dispatch = useDispatch();

  const { isPayment } = useSelector((state: RootType) => state.alertSlice);
  const { hightBorderSum } = useSelector(
    (state: RootType) => state.paymentSlice
  );

  const [paimentValue, setPaimentValue] = useState<string>("0 ₽");

  const [alertPaiment, setAlertPayment] = useState<boolean>(false);

  const handleBlur = () => {
    if (!paimentValue.replace(" ₽", "")) return setPaimentValue("0 ₽");

    if (Number(paimentValue.replace(" ₽", "")) > hightBorderSum)
      setPaimentValue(`${hightBorderSum} ₽`);
  };

  const handleLeave = (): void => {
    dispatch(togglePayment(false));
    dispatch(toggleWrapper(false));
  };

  const skipRuble = (event: MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const startPosition = input.selectionStart || 0;
    const needPosition = input.value.replace(" ₽", "").length;

    if (startPosition > needPosition)
      input.setSelectionRange(needPosition, needPosition);
  };

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const currentSum = event.target.value.replace(" ₽", "");

    if (!/^[0-9]*$/.test(currentSum)) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Вводите только числа!",
        })
      );

      return setAlertPayment(true);
    }

    setPaimentValue(currentSum + " ₽");

    setTimeout(
      () => input.setSelectionRange(currentSum.length, currentSum.length),
      0
    );
  };

  useEffect(() => {
    if (alertPaiment) return setAlertPayment(false);
  }, [paimentValue]);

  return (
    <div className={isPayment ? "make-payment visible" : "make-payment"}>
      <LeaveCross handleLeave={handleLeave} />

      <div className="payment-wrapper-input">
        <input
          name="payment-input"
          id="payment-input"
          className={alertPaiment ? "payment-input alert" : "payment-input"}
          type="text"
          value={paimentValue}
          onChange={changeInputHandler}
          onClick={skipRuble}
          onBlur={handleBlur}
        />
        <label htmlFor="payment-input">
          введите платеж больше расчетной суммы
        </label>
      </div>

      <div className="send-payment">
        <p>внести</p>
      </div>
    </div>
  );
};

export default MakePayment;
