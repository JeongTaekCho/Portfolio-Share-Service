import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import { Wrap, Head, HeadContainer, LogoBox, Navigation, Menu, MenuList, ListBtn } from "../styles/user/Header";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Wrap>
      <Head>
        <HeadContainer>
          <LogoBox
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/images/logo.png" />
          </LogoBox>
          <Navigation>
            <Menu>
              {isLogin && (
                <MenuList>
                  <ListBtn
                    onClick={() => {
                      navigate("/network");
                    }}
                  >
                    포트폴리오 공유
                  </ListBtn>
                </MenuList>
              )}
              {location.pathname === "/login" && (
                <MenuList>
                  <ListBtn
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    회원가입
                  </ListBtn>
                </MenuList>
              )}
              {location.pathname === "/register" && (
                <MenuList>
                  <ListBtn
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    로그인
                  </ListBtn>
                </MenuList>
              )}

              <MenuList>{isLogin && <ListBtn onClick={logout}>로그아웃</ListBtn>}</MenuList>
            </Menu>
          </Navigation>
        </HeadContainer>
      </Head>
    </Wrap>
  );
}

export default Header;
