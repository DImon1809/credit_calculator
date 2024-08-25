import { FC } from "react";

import FormsWrapper from "../../components/user-forms/forms-wrapper/FormsWrapper";

import "./PersonalAccount.scss";

const PersonalAccount: FC = () => {
  return (
    <section className="personal-account">
      <FormsWrapper />
    </section>
  );
};

export default PersonalAccount;
