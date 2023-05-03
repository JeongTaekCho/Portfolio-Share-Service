import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { Wrap, Container, ImgBox, Form, Title } from "../../styles/user/RegisterForm";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { errorModal, successModal } from "../modals/AlertModal";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [errorName, setErrorName] = useState([]);
  const [errorEmail, setErrorEmail] = useState([]);
  const [errorPassword, setErrorPassword] = useState([]);
  const [errorConfirm, setErrorConfirm] = useState([]);

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2) {
      setNameValid(true);
      setErrorName(["이름은 2글자 이상으로 설정해 주세요."]);
    } else {
      setNameValid(false);
      setErrorName([]);
    }

    if (e.target.value && email && password && confirmPassword && password === confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (
      e.target.value
        .toLowerCase()
        .match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i)
    ) {
      setEmailValid(false);
      setErrorEmail([]);
    } else {
      setEmailValid(true);
      setErrorEmail(["이메일 형식이 올바르지 않습니다."]);
    }
    if (name && e.target.value && password && confirmPassword && password === confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onChagnePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 4) {
      setPasswordValid(true);
      setErrorPassword(["비밀번호는 4글자 이상으로 설정해 주세요."]);
    } else {
      setPasswordValid(false);
      setErrorPassword([]);
    }
    if (e.target.value !== confirmPassword) {
      setConfirmPasswordValid(true);
      setErrorConfirm(["비밀번호가 일치하지 않습니다."]);
    } else if (e.target.value === confirmPassword) {
      setConfirmPasswordValid(false);
      setErrorConfirm([]);
    }
    if (name && email && e.target.value && confirmPassword && e.target.value === confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordValid(true);
      setErrorConfirm(["비밀번호가 일치하지 않습니다."]);
    } else if (e.target.value === password) {
      setConfirmPasswordValid(false);
      setErrorConfirm([]);
    }
    if (name && email && password && e.target.value && password === e.target.value) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password && confirmPassword && name) {
        await Api.post("user/register", {
          email,
          password,
          name,
        });
        successModal("회원가입이 완료되었습니다.");
      } else {
        errorModal("빈 칸을 채워주세요.");
        return;
      }
      navigate("/login");
    } catch (err) {
      errorModal("회원가입에 실패 했습니다.");
    }
  };

  return (
    <Wrap>
      <Container>
        <ImgBox>
          <img src="/images/register.png" />
        </ImgBox>

        <Form onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <TextField
            error={nameValid}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            type="text"
            text="off"
            value={name}
            onChange={onChangeName}
            helperText={errorName[0]}
            sx={{
              m: 1,
              width: "100%",
              " .MuiOutlinedInput-root": {
                fontSize: "1.6rem",
              },
              margin: 0,
              marginBottom: "1rem",
            }}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />

          <TextField
            error={emailValid}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onChangeEmail}
            helperText={errorEmail[0]}
            sx={{
              m: 1,
              width: "100%",
              " .MuiOutlinedInput-root": {
                fontSize: "1.6rem",
              },
              margin: 0,
              marginBottom: "1rem",
            }}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
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
            sx={{
              m: 1,
              width: "100%",
              " .MuiOutlinedInput-root": {
                fontSize: "1.6rem",
              },
              margin: 0,
              marginBottom: "1rem",
            }}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
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
            sx={{
              m: 1,
              width: "100%",
              " .MuiOutlinedInput-root": {
                fontSize: "1.6rem",
              },
              margin: 0,
              marginBottom: "1rem",
            }}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            disabled={!nameValid && !emailValid && !passwordValid && !confirmPasswordValid && isValid ? false : true}
            style={{ fontSize: "1.8rem" }}
          >
            Register
          </Button>
        </Form>
      </Container>
    </Wrap>
  );
}

export default RegisterForm;
