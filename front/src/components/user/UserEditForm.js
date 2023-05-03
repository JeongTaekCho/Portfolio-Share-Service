import React, { useState } from "react";
import { Button, Modal } from "antd";
import * as Api from "../../api";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { errorModal, successModal } from "../modals/AlertModal";

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

    try {
      const formData = new FormData();
      formData.append("img", file);
      formData.append("profile", user.profile);

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
      const updatedUser = res.data;
      setUser(updatedUser);
      setIsEditing(false);
      successModal("프로필 업데이트에 성공하였습니다.");
    } catch (err) {
      errorModal("프로필 업데이트에 실패하였습니다.");
    }
  };

  const handleCancel = (e) => {
    setIsEditing(false);
  };

  return (
    <UserEditContainer>
      <Modal title="내 정보 변경" open={isEditing} onOk={handleSubmit} onCancel={handleCancel}>
        <ImageBox>
          <Image
            variant="top"
            style={{ display: "block", width: "100%", height: "100%" }}
            className=""
            src={imgFile || `http://localhost:5001/${user?.profile}`}
            alt="유저 프로필 사진"
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
          sx={{
            m: 1,
            width: "100%",
            " .MuiOutlinedInput-root": {
              fontSize: "1.8rem",
            },
          }}
          InputLabelProps={{
            style: { fontSize: "1.8rem" },
          }}
          style={{ font: "1.8rem" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="이메일"
          name="email"
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "100%",
            " .MuiOutlinedInput-root": {
              fontSize: "1.8rem",
            },
          }}
          InputLabelProps={{
            style: { fontSize: "1.8rem" },
          }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="상태 메세지"
          name="description"
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "100%",
            " .MuiOutlinedInput-root": {
              fontSize: "1.8rem",
            },
          }}
          InputLabelProps={{
            style: { fontSize: "1.8rem" },
          }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Modal>
    </UserEditContainer>
  );
}

const UserEditContainer = styled.div`
  input {
    font-size: 18px !important;
  }
`;

const ImageBox = styled.div`
  width: 60%;
  height: 25rem;
  position: relative;
  margin: 0 auto 1rem;
`;

const InputFile = styled.input`
  display: none;
`;

const EditLabel = styled.label`
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 0 auto 2rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default UserEditForm;
