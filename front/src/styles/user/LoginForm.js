import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: #9053c7;
  background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
  background: linear-gradient(-135deg, #c850c0, #4158d0);
`;

export const Container = styled.div`
  width: 960px;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 17.7rem 13rem 3.3rem 9.5rem;
  margin-top: 5.7rem;
`;

export const ImgBox = styled.div`
  width: 31.6rem;
  img {
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 29rem;
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    margin-bottom: 2rem;
  }
  .css-jh47zj-MuiButtonBase-root-MuiButton-root {
    width: 100%;
  }
`;

export const Title = styled.span`
  font-size: 6rem;
  color: #333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 3rem;
  font-weight: 300;
`;
