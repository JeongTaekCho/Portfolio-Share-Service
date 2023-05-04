import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import { Container, ContentBox, Wrap } from "../../styles/user/Network";
import { Pagination } from "antd";
import styled from "styled-components";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }

    Api.get(`userlist?page=${page}`).then((res) => setUsers(res.data));
  }, [userState, navigate, page]);

  const onChangePage = async (value) => {
    setPage(value);
  };

  console.log(users);

  return (
    <Wrap fluid>
      <Container>
        <ContentBox style={{ gap: "2rem" }}>
          {users?.users?.map((user) => (
            <UserCard key={user.id} user={user} isNetwork />
          ))}
        </ContentBox>
        <PagenationBox>
          <Pagination total={users?.totalPages * 8} onChange={onChangePage} current={page} />
        </PagenationBox>
      </Container>
    </Wrap>
  );
}

export default Network;

const PagenationBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  .css-dev-only-do-not-override-yp8pcc.ant-pagination .ant-pagination-item a {
    color: #fff;
  }
  .css-dev-only-do-not-override-yp8pcc.ant-pagination .ant-pagination-item-active a {
    color: #9932cc;
  }
  .ant-pagination-item-link svg {
    color: #fff;
  }
`;
