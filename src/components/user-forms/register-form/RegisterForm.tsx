import { FC, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../../store/features/alertSlice";
import { useRegisterMutation } from "../../../store/services/endpoints/userApi";

import { handleError } from "../../../errorTypeGuard";

import FormInput from "../../UI/form-input/FormInput";
import FormButton from "../../UI/form-button/FormButton";

import "./RegisterForm.scss";

import { IForms } from "../forms-wrapper/FormsWrapper";

const RegisterForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
  const dispatch = useDispatch();

  const [triggerRegister, { error, isSuccess, isLoading }] =
    useRegisterMutation();

  const [directionName, setDiractionName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
  const [pasType, setPasType] = useState<string>("password");

  const [alertEmail, setAlertEmail] = useState<boolean>(false);
  const [alertPassword, setAlertPassword] = useState<boolean>(false);

  const setAlertsInput = (alEmail: boolean, alPass: boolean): void => {
    setAlertEmail(alEmail);
    setAlertPassword(alPass);
  };

  const handleChangeEmail = (value: string): void => {
    setEmail(value);
  };

  const handleChangePassword = (value: string): void => {
    setPassword(value);
  };

  const handleEye = () => {
    if (!isOpenEye) {
      setPasType("text");
      return setIsOpenEye(true);
    }

    if (isOpenEye) {
      setPasType("password");
      return setIsOpenEye(false);
    }
  };

  const handleToBack = (): void => {
    changeSlideMove("description");
    setEmail("");
    setPassword("");
    setIsOpenEye(false);
    setPasType("password");

    return setAlertsInput(false, false);
  };

  const handleRegister = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email.length || !password.length) {
      !email.length && setAlertEmail(true);
      !password.length && setAlertPassword(true);

      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Все поля надо заполнить",
        })
      );

      return;
    }

    if (!emailRegex.test(email)) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Некорректый формат email!",
        })
      );

      return setAlertsInput(true, false);
    }

    if (password.length < 6) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Пароль короче 6 символов!",
        })
      );

      return setAlertsInput(false, true);
    }

    !isLoading && triggerRegister({ email, password });
  };

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "registration") setDiractionName("right");
  }, [slideMove]);

  useEffect(() => {
    if (error && !isSuccess) {
      if (handleError(error)?.status === 409) {
        dispatch(
          toggleAlert({
            isAlert: true,
            isAuthAlert: false,
            alertText: "Пользователь уже существует!",
          })
        );

        return setAlertsInput(true, true);
      }

      if (handleError(error)?.status === 400) {
        dispatch(
          toggleAlert({
            isAlert: true,
            isAuthAlert: false,
            alertText: "Что-то пошло не так!",
          })
        );
      }
    }

    if (!error && isSuccess) {
      setEmail("");
      setPassword("");

      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Пользователь уже существует!",
        })
      );

      return setAlertsInput(false, false);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (alertEmail || alertPassword) {
      setAlertEmail(false);
      setAlertPassword(false);
    }
  }, [email, password]);

  return (
    <div className={`register-form-wrapper ${directionName}`}>
      <div className="register-title">
        <h3>Регистрация</h3>
      </div>

      <form className="register-form">
        <FormInput
          type="text"
          inputName="email"
          inputId="register-email"
          inputValue={email}
          inputText="Введите email"
          isAlert={alertEmail}
          setInputValue={handleChangeEmail}
        />

        <FormInput
          type={pasType}
          inputName="password"
          inputId="register-password"
          inputValue={password}
          inputText="Введите пароль"
          isOpenEye={isOpenEye}
          isPassword={true}
          isAlert={alertPassword}
          handleEye={handleEye}
          setInputValue={handleChangePassword}
        />

        <div className="buttons-wrapper">
          <FormButton
            isLoading={isLoading}
            buttonText="зарегистрироваться"
            functionButton={handleRegister}
          />
          <FormButton buttonText="отмена" functionButton={handleToBack} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
