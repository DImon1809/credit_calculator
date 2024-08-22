import { FC, useState } from "react";

import "./FormsWrapper.scss";

import DescriptionForm from "../desription-form/DescriptionForm";
import AuthForm from "../auth-form/AuthForm";
import RegisterForm from "../register-form/RegisterForm";

export interface IForms {
  slideMove: string;
  changeSlideMove: (direction: string) => void;
}

const FormsWrapper: FC = () => {
  const [slideMove, setSlideMove] = useState<string>("description");

  const changeSlideMove = (direction: string): void => {
    setSlideMove(direction);
  };

  return (
    <div className="forms-wrapper">
      <RegisterForm slideMove={slideMove} changeSlideMove={changeSlideMove} />
      <DescriptionForm
        slideMove={slideMove}
        changeSlideMove={changeSlideMove}
      />
      <AuthForm slideMove={slideMove} changeSlideMove={changeSlideMove} />
    </div>
  );
};

export default FormsWrapper;
