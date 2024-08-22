import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "./store";
import { toggleOpenMenu, toggleWrapper } from "./store/features/gWrapperslice";

import "./App.scss";

import Navbar from "./components/navbar/Navbar";
import ForDeveloper from "./pages/for-developer/ForDeveloper";
import PersonalAccount from "./pages/personal-account/PersonalAccount";
import FunctionalPage from "./pages/functional-page/FunctionalPage";
import NotFound from "./pages/not-found/NotFound";

import AlertWindow from "./alert-window/AlertWindow";

const App: FC = () => {
  const dispatch = useDispatch();

  const { isGlobal } = useSelector((state: RootType) => state.gWrapperSlice);

  const handleglobal = (): void => {
    dispatch(toggleWrapper(false));
    dispatch(toggleOpenMenu(false));
  };

  return (
    <>
      <Navbar />
      <AlertWindow />
      <div
        className={isGlobal ? "global-wrapper visible" : "global-wrapper"}
        onClick={handleglobal}
      ></div>
      <Routes>
        <Route path="/" element={<PersonalAccount />} />
        <Route path="/developer" element={<ForDeveloper />} />
        <Route path="/functional" element={<FunctionalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
