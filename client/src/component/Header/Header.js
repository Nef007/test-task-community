import React from "react";
import { Button, Dropdown, Menu } from "antd";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import ExportOutlined from "@ant-design/icons/lib/icons/ExportOutlined";
import { useRootStore } from "../../store";
import s from "./header.module.css";

export const Header = ({ user }) => {
  const { currentUserStore } = useRootStore();
  return (
    <div className={s.toolsControl}>
      <Dropdown
        ttrigger={["click"]}
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => currentUserStore.logout()}
              key="2"
              icon={<ExportOutlined />}
            >
              Выйти
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
      >
        <Button>
          {currentUserStore.user.email}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
