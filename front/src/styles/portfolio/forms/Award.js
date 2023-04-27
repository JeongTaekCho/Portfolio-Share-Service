import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;

  .css-ekfslj-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    margin: 0;
  }
  .css-1xhypcz-MuiStack-root {
    width: 100%;
    justify-content: space-between;
    margin: 20px 0;
  }
  .css-1xhypcz-MuiStack-root > .MuiTextField-root {
    width: 100%;
  }
  .css-1nvn3ta-JoyTextarea-root {
    margin-bottom: 20px;
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
