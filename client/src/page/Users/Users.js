import React, { useEffect } from "react";
import avatar from "../../asset/img/avatar.jpg";
import { Card } from "../../component/Card/Card";
import "./user.css";
import { Empty, Pagination } from "antd";
import { useRootStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Loader } from "../../component/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

export const Users = observer(() => {
  const { usersStore } = useRootStore();
  const navigate = useNavigate();
  let page = useParams().page;

  console.log(page);

  useEffect(() => {
    usersStore.getAll({
      pagination: {
        current: page,
        pageSize: usersStore.pagination.pageSize,
      },
    });
  }, []);

  const onSetPagination = (page, pageSize) => {
    console.log(page, pageSize);
    usersStore.getAll({
      pagination: {
        current: page,
        pageSize,
      },
    });
    navigate(`/people/${page}`);
  };

  let ar = [];
  return (
    <>
      <div className="title">Пользователи</div>
      <div className="content">
        {usersStore.loading ? (
          <Loader />
        ) : usersStore.users.length > 0 ? (
          <>
            <div className="card-list">
              {usersStore.users.map((user) => (
                <Card
                  key={user._id}
                  name={user.name}
                  birthday={user.birthday}
                  avatar={user.avatar}
                />
              ))}
            </div>
            <Pagination
              onChange={onSetPagination}
              defaultCurrent={usersStore.pagination.current}
              total={usersStore.pagination.total}
            />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
});
