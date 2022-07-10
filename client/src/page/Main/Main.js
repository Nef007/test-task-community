import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { message } from "antd";
import s from "./main.module.css";

import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { Loader } from "../../component/Loader/Loader";
import { Header } from "../../component/Header/Header";
import { Profile } from "../Profile/Profile";
import { Users } from "../Users/Users";
import { Auth } from "../Auth/Auth";
import { Menu } from "../../component/Menu/Menu";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import { Logo } from "../../component/Logo/Logo";
import logo from "../../asset/img/logo.png";

export const Main = observer((props) => {
  const { currentUserStore, notification } = useRootStore();
  const { initialized, isAuth } = currentUserStore;
  const { info } = notification;

  useEffect(() => {
    currentUserStore.initializedApp();
  }, []);

  useEffect(() => {
    if (info.message) {
      if (info.status === "success") message.success(info.message);
      if (info.status === "error") message.error(info.message);
      if (info.status === "info") message.info(info.message);
    }
  }, [info]);

  if (!initialized) {
    return <Loader />;
  }

  return isAuth ? (
    <div className={s.wrapper}>
      <header>
        <Header />
      </header>
      <aside>
        <Logo title="Сообщество" img={logo} />
        <Menu
          menu_items={[
            {
              title: "Профиль",
              icon: <UserOutlined />,
              href: "/account",
            },
            {
              title: "Пользователи",
              icon: <TeamOutlined />,
              href: "/people",
            },
          ]}
        />
      </aside>
      <article>
        <Routes>
          <Route path="/account" element={<Profile />} />
          <Route path="/people/:page" element={<Users />} />
          <Route path="/people" element={<Navigate replace to="/people/1" />} />
          <Route path="/*" element={<Navigate replace to="/account" />} />
        </Routes>
      </article>
      <footer>2022</footer>
    </div>
  ) : (
    <Auth />
  );
});
