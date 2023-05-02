import React, { useState } from "react";
import { Button, Modal } from "antd";
import * as Api from "../../api";
import { TextField } from "@mui/material";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

function UserEditForm({ user, setIsEditing, setUser, isEditing }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const onChangeImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setFile(e.target.files[0]);
  };

  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const formData = new FormData();
    formData.append("img", file);

    const profile = await axios.post("http://localhost:5001/upload", formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });

    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      profile,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    setIsEditing(false);
  };

  return (
    <>
      <Modal title="내 정보 변경" open={isEditing} onOk={handleSubmit} onCancel={handleCancel}>
        <ImageBox>
          <Image
            variant="top"
            style={{ display: "block", width: "100%", height: "100%" }}
            className=""
            src={imgFile || `http://localhost:5001/${user?.profile}`}
            alt="고양이 사진"
            rounded
          />
        </ImageBox>
        <InputFile type="file" id="editPhoto" onChange={onChangeImage} />
        <EditLabel htmlFor="editPhoto">
          <img src="/images/camera.png" />
        </EditLabel>
        <TextField
          label="이름"
          name="name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="이메일"
          name="email"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "100%" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="상태 메세지"
          name="description"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "100%" }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Modal>
    </>
  );
}

const ImageBox = styled.div`
  width: 60%;
  height: 250px;
  position: relative;
  margin: 0 auto 10px;
`;

const InputFile = styled.input`
  display: none;
`;

const EditLabel = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 auto 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default UserEditForm;
