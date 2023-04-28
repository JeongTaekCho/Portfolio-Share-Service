import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import {Wrap, Container, ImgBox, Form, Title} from "../../styles/user/RegisterForm";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  const [errorName, setErrorName] = useState([]);
  const [errorEmail, setErrorEmail] = useState([]);
  const [errorPassword, setErrorPassword] = useState([]);
  const [errorConfirm, setErrorConfirm] = useState([]);

  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)


  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.

  const onChangeName = (e) => {
    setName(e.target.value)
    if(e.target.value.length < 2){
      setNameValid(true)
      setErrorName(["이름은 2글자 이상으로 설정해 주세요."])
    }else{
      setNameValid(false)
      setErrorName([]);
    }
  }


  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if(e.target.value
      .toLowerCase()
      .match(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      )){
      setEmailValid(false)
      setErrorEmail([]);
    }else{
      setEmailValid(true)
      setErrorEmail(["이메일 형식이 올바르지 않습니다."])
    }
  }

  const onChagnePassword = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 4){
      setPasswordValid(true)
      setErrorPassword(["비밀번호는 4글자 이상으로 설정해 주세요."])
    }else{
      setPasswordValid(false)
      setErrorPassword([]);
    }
    
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    if(e.target.value !== password){
      setConfirmPasswordValid(true)
      setErrorConfirm(["비밀번호가 일치하지 않습니다."])
    }else if(e.target.value === password){
      setConfirmPasswordValid(false)
      setErrorConfirm([]);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email.length)


      await Api.post("user/register", {
        email,
        password,
        name,
      });

      navigate("/login");
    } catch (err) {
      alert(err.message)
      // alert(err.message)
    }
  };


 return(
<Wrap>
  <Container>
  <ImgBox>
  <img src="/images/register.png"/>
  </ImgBox>

  <Form onSubmit={handleSubmit}>
  <Title>Sign Up</Title>
  <TextField
    error={nameValid}
    id="filled-basic"
    label="Name"
    variant="filled"
    size="small"
    type="text"
    text="off"
    value={name}
    onChange={onChangeName}
    helperText={errorName[0]}
    />

  <TextField
    error={emailValid}
    id="filled-basic"
    label="Email"
    variant="filled"
    size="small"
    type="email"
    autoComplete="off"
    value={email}
    onChange={onChangeEmail}
    helperText={errorEmail[0]}
    />


  <TextField
      error={passwordValid}
      id="outlined-basic"
      label="password"
      variant="outlined"
      size="small"
      type="password"
      autoComplete="off"
      value={password}
      onChange={onChagnePassword}
      helperText={errorPassword[0]}
        />
      

  <TextField
      error={confirmPasswordValid}
      id="outlined-basic"
      label="Confirm Password"
      variant="outlined"
      size="small"
      type="password"
      autoComplete="off"
      value={confirmPassword}
      onChange={onChangeConfirmPassword}
      helperText={errorConfirm[0]}
        />
  <Button onClick={handleSubmit} variant="contained" type="submit">Register</Button>
    </Form>
    </Container>
  </Wrap>


    // <Container>
    //   <Row className="justify-content-md-center mt-5">
    //     <Col lg={8}>
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group controlId="registerEmail">
    //           <Form.Label>이메일 주소</Form.Label>
    //           <Form.Control
    //             type="email"
    //             autoComplete="off"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //           {!isEmailValid && (
    //             <Form.Text className="text-success">
    //               이메일 형식이 올바르지 않습니다.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="registerPassword" className="mt-3">
    //           <Form.Label>비밀번호</Form.Label>
    //           <Form.Control
    //             type="password"
    //             autoComplete="off"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           {!isPasswordValid && (
    //             <Form.Text className="text-success">
    //               비밀번호는 4글자 이상으로 설정해 주세요.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="registerConfirmPassword" className="mt-3">
    //           <Form.Label>비밀번호 재확인</Form.Label>
    //           <Form.Control
    //             type="password"
    //             autoComplete="off"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //           />
    //           {!isPasswordSame && (
    //             <Form.Text className="text-success">
    //               비밀번호가 일치하지 않습니다.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="registerName" className="mt-3">
    //           <Form.Label>이름</Form.Label>
    //           <Form.Control
    //             type="text"
    //             autoComplete="off"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //           {!isNameValid && (
    //             <Form.Text className="text-success">
    //               이름은 2글자 이상으로 설정해 주세요.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group as={Row} className="mt-3 text-center">
    //           <Col sm={{ span: 20 }}>
    //             <Button variant="primary" type="submit" disabled={!isFormValid}>
    //               회원가입
    //             </Button>
    //           </Col>
    //         </Form.Group>

    //         <Form.Group as={Row} className="mt-3 text-center">
    //           <Col sm={{ span: 20 }}>
    //             <Button variant="light" onClick={() => navigate("/login")}>
    //               로그인하기
    //             </Button>
    //           </Col>
    //         </Form.Group>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>
);
}

export default RegisterForm;
