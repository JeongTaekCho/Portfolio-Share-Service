import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

import React, { useState } from "react";
import styled from "styled-components";
import { res } from "../../styles/responsive";
import { serverUrl } from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        border="light"
        className="userCard"
        style={{ width: "23.75%", maxHeight: "50rem", backgroundColor: "#a996f5" }}
      >
        <Card.Header
          style={{
            fontWeight: "600",
            fontSize: "3rem",
            color: "white",
            backgroundColor: "#7217bc",
            textAlign: "center",
            height: "7rem",
          }}
        >
          {user?.name}
        </Card.Header>
        <Image
          variant="top"
          style={{ width: "90%", height: "22rem", margin: "1rem auto 0", fontSize: "1.8rem" }}
          className=""
          src={`${serverUrl}${user?.profile}`}
          alt="유저 프로필 사진"
          rounded
        />
        <Card.Body>
          <Button
            variant=""
            style={{ width: "100%", backgroundColor: "#6722c7", color: "white", fontWeight: "550", fontSize: "1.8rem" }}
            onClick={handleShow}
          >
            Introduce
          </Button>
          <Modal show={show} onHide={handleClose} animation={false}>
            <ModalContainer>
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.8rem" }}>{user?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ fontSize: "1.8rem" }}>{user?.description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ fontSize: "1.8rem" }}>
                  취소
                </Button>
              </Modal.Footer>
            </ModalContainer>
          </Modal>

          {isEditable && (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant=""
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#9c0a9d",
                      fontWeight: "550",
                      marginBottom: "2rem",
                      fontSize: "1.8rem",
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    edit
                  </Button>
                </Col>
              </Row>
            </Col>
          )}

          {isNetwork && (
            <Button
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#9119c0",
                fontWeight: "550",
                marginBottom: "3rem",
                fontSize: "1.8rem",
              }}
              variant=""
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              Portfolio
            </Button>
          )}
          <Card.Footer
            className="text-muted"
            style={{ fontWeight: "600", backgroundColor: "#e7dcff", textAlign: "center", fontSize: "1.8rem" }}
          >
            {user?.email}
          </Card.Footer>
          {<br />}
        </Card.Body>
      </Card>
    </>
  );
}

export default UserCard;

const ModalContainer = styled.div`
  width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  @media ${res.tablet} {
    width: 65%;
  }
  @media ${res.mobile} {
    width: 90%;
  }
`;
