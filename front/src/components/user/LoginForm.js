import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { Container, Form, ImgBox, Title, Wrap } from "../../styles/user/LoginForm";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { errorModal } from "../modals/AlertModal";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("user/login", {
        email,
        password,
      });
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      navigate("/", { replace: true });
    } catch (err) {
      errorModal("로그인에 실패하였습니다.\n", err.message);
    }
  };

  return (
    <Wrap>
      <Container>
        <ImgBox>
          <img src="/images/kkam.jpeg" />
        </ImgBox>
        <Form onSubmit={handleSubmit}>
          <Title>Login</Title>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button variant="contained" size="large" type="submit" disabled={!isFormValid} style={{ fontSize: "1.8rem" }}>
            Login
          </Button>
        </Form>
      </Container>
    </Wrap>
  );
}

export default LoginForm;
