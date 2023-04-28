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
  padding: 15px;
  background: #9053c7;
  background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
  background: linear-gradient(-135deg, #c850c0, #4158d0);
`

export const Container = styled.div`
  width: 960px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 100px 130px 100px 95px;
  margin-top: 57px;
`
export const ImgBox = styled.div`
  width: 300px;
  padding-top: 50px;
  img {
    width: 100%;
  }
`;

  
export const Title = styled.span`
  font-family: Poppins-Bold;
  font-size: 40px;
  color: black;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 50px;
  font-weight: 700;
  `;


  export const Form = styled.form`
  width: 290px;
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    margin-bottom: 20px;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
    width: 100%;
    margin-bottom: 20px;
  }
  .css-10botns-MuiInputBase-input-MuiFilledInput-input{
    width: 100%;
    margin-bottom: 20px;
  }
  .css-sghohy-MuiButtonBase-root-MuiButton-root{
    width: 100%;
    margin-top: 20px;
    font-family: Poppins-Bold;
    font-weight: 550;
  }
  `;