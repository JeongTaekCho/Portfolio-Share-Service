import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
`;

export const Head = styled.header`
  width: 100%;
  height: 84px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const HeadContainer = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoBox = styled.div`
  width: 95px;
  cursor: pointer;
  img {
    width: 100%;
  }
  &:hover img {
    transform: scale(1.2);
    transition: 0.2s;
  }
`;

export const Navigation = styled.nav``;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 0;
`;

export const MenuList = styled.li`
  list-style: none;
`;

export const ListBtn = styled.button`
  border: none;
  background: none;
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  &:hover {
    font-size: 17px;
    transition: 0.2s;
    font-weight: 600;
  }
`;
