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
  }
  .css-1xhypcz-MuiStack-root {
    width: 100%;
    justify-content: space-between;
    margin: 2rem 0;
  }
  .css-1xhypcz-MuiStack-root > .MuiTextField-root {
    width: 100%;
  }
  .css-1nvn3ta-JoyTextarea-root {
    margin-bottom: 2rem;
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
