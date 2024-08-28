import { FC, MouseEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../../store/features/alertSlice";
import { toggleUserData } from "../../../store/features/useSlice";

import { RootType } from "../../../store";

import FormInput from "../../UI/form-input/FormInput";
import FormButton from "../../UI/form-button/FormButton";

import "./AuthForm.scss";

import { IForms } from "../forms-wrapper/FormsWrapper";

const tokenKey = "token";

const AuthForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
  const dispatch = useDispatch();

  const [directionName, setDiractionName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
  const [pasType, setPasType] = useState<string>("password");

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
  };

  const handleAuth = (): void => {
    localStorage.setItem(tokenKey, "token");

    dispatch(
      toggleAlert({
        isAlert: true,
        alertText: "Вы авторизовались!",
        isAuthAlert: false,
      })
    );

    dispatch(toggleUserData(true));
  };

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "authorization") return setDiractionName("left");
  }, [slideMove]);

  return (
    <div className={`auth-form-wrapper ${directionName}`}>
      <div className="auth-title">
        <h3>Авторизация</h3>
      </div>

      <form className="auth-form">
        <FormInput
          type="text"
          inputName="email"
          inputId="auth-email"
          inputValue={email}
          inputText="Введите е-маил"
          setInputValue={handleChangeEmail}
        />

        <FormInput
          type={pasType}
          inputName="password"
          inputId="auth-password"
          inputValue={password}
          inputText="Введите пароль"
          isOpenEye={isOpenEye}
          isPassword={true}
          handleEye={handleEye}
          setInputValue={handleChangePassword}
        />

        <div className="buttons-wrapper">
          <FormButton buttonText="авторизоваться" functionButton={handleAuth} />
          <FormButton buttonText="отмена" functionButton={handleToBack} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
