import { FC } from "react";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import "./FormInput.scss";

export interface IFormInput {
  type: string;
  inputName: string;
  inputId: string;
  inputValue: string;
  inputText: string;
  isPassword?: boolean;
  isOpenEye?: boolean;
  setInputValue: (value: string) => void;
  handleEye?: () => void;
}

const FormInput: FC<IFormInput> = ({
  type,
  inputName,
  inputId,
  inputValue,
  inputText,
  isPassword,
  isOpenEye,
  setInputValue,
  handleEye,
}) => {
  return (
    <div className="form-input-wrapper">
      <input
        type={type}
        name={inputName}
        id={inputId}
        className={isPassword ? "form-input is-password" : "form-input"}
        placeholder=" "
        autoComplete="off"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <label htmlFor={inputId}>{inputText}</label>

      {isPassword ? (
        <div className="eye-wrapper" onClick={handleEye}>
          {isOpenEye ? <FiEye /> : <FiEyeOff />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormInput;
