import { FC, useState, useEffect } from "react";

import FormInput from "../../UI/form-input/FormInput";
import FormButton from "../../UI/form-button/FormButton";

import "./RegisterForm.scss";

import { IForms } from "../forms-wrapper/FormsWrapper";

const RegisterForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
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

  const handleEye = (): void => {
    isOpenEye ? setPasType("text") : setPasType("password");

    setIsOpenEye((state) => !state);
  };

  const handleToBack = (): void => {
    changeSlideMove("description");
    setEmail("");
    setPassword("");
    setIsOpenEye(false);
    setPasType("password");
  };

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "registration") return setDiractionName("right");
  }, [slideMove]);

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
          inputText="Введите е-маил"
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
          handleEye={handleEye}
          setInputValue={handleChangePassword}
        />

        <div className="buttons-wrapper">
          <FormButton buttonText="зарегистрироваться" />
          <FormButton buttonText="отмена" functionButton={handleToBack} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
