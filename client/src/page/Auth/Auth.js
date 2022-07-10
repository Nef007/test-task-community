import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import s from "./auth.module.css";

export const Auth = (props) => {
  return (
    <div className={s.bg}>
      <div className={s.bg__img}>
        <div className={s.auth}>
          <div className={s.auth__card}>
            <div className={s.auth__head}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${s.auth__headerItem} ${s.auth__headerItem_active}`
                    : `${s.auth__headerItem}`
                }
                to="/auth"
              >
                Вход
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${s.auth__headerItem} ${s.auth__headerItem_active}`
                    : `${s.auth__headerItem}`
                }
                to="/register"
              >
                Регистрация
              </NavLink>
            </div>
            <div className={s.auth__form}>
              <Routes>
                <Route path="/auth" element={<LoginForm />} />
                <Route path="/register" end element={<RegisterForm />} />
                <Route
                  path="/*"
                  end
                  element={<Navigate replace to="/auth" />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
