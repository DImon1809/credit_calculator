import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";
import {
  toggleWrapper,
  toggleOpenMenu,
} from "../../store/features/gWrapperslice";

import "./Navbar.scss";

import logo from "../../assets/logo.webp";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  const { isAuthAlert } = useSelector((state: RootType) => state.alertSlice);
  const { isGlobal, isOpenMenu } = useSelector(
    (state: RootType) => state.gWrapperSlice
  );

  const [isBorderNav, setIsBorderNav] = useState<boolean>(false);

  const handleScroll = () => {
    if (document.documentElement.scrollTop !== 0) return setIsBorderNav(true);

    return setIsBorderNav(false);
  };

  const handleBurger = (): void => {
    if (!isOpenMenu) {
      dispatch(toggleWrapper(true));
      dispatch(toggleOpenMenu(true));
    }

    if (isOpenMenu) {
      dispatch(toggleWrapper(false));
      dispatch(toggleOpenMenu(false));
    }
  };

  const handleItem = () => {
    isGlobal && dispatch(toggleWrapper(false));
    isOpenMenu && dispatch(toggleOpenMenu(false));
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isBorderNav || isGlobal ? "navbar border" : "navbar"}>
      <div className="navbar-content-wrapper">
        <div className="logo-title" onClick={() => window.location.reload()}>
          <div className="logo-wrapper">
            <img src={logo} alt="#" />
          </div>
          <p>Кредитный калькулятор</p>
        </div>

        <div className={isOpenMenu ? "items-wrapper active" : "items-wrapper"}>
          <ul>
            <li className="nav-item" onClick={handleItem}>
              <Link to="/">главная</Link>
            </li>
            <li
              className={isAuthAlert ? "nav-item alert" : "nav-item"}
              onClick={handleItem}
            >
              <Link to="/account">личный кабинет</Link>
            </li>
            <li className="nav-item" onClick={handleItem}>
              <Link to="/developer">для разработчиков</Link>
            </li>
          </ul>
        </div>

        <div
          className={
            isOpenMenu
              ? "burger active"
              : isAuthAlert
              ? "burger alert"
              : "burger"
          }
          onClick={handleBurger}
        >
          <span className="center-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
