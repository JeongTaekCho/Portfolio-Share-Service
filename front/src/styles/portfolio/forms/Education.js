import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .css-ekfslj-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    margin: 0;
    margin-bottom: 2rem;
  }
  .css-9ou33r-JoyRadioGroup-root {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    span {
      margin: 0;
    }
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .cancelBtn {
    background-color: #f00;
    &:hover {
      background-color: #c83e2b;
    }
  }
`;
