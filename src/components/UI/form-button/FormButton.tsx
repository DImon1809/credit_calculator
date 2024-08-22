import { FC, MouseEvent } from "react";

import "./FormButton.scss";

export interface IFormButton {
  buttonText: string;
  functionButton?: () => void;
}

const FormButton: FC<IFormButton> = ({ buttonText, functionButton }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    functionButton && functionButton();
  };

  return (
    <div className="form-button" onClick={handleClick}>
      <p className="form-button-text">{buttonText}</p>
    </div>
  );
};

export default FormButton;
