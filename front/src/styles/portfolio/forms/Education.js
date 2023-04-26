import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;

  .css-ekfslj-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
  .css-9ou33r-JoyRadioGroup-root {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    span {
      margin: 0;
    }
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;

  .cancelBtn {
    background-color: #f00;
    &:hover {
      background-color: #c83e2b;
    }
  }
`;
