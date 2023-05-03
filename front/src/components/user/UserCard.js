import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

import Pagination from 'react-bootstrap/Pagination';

import React, { useState } from "react";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
  <>
    <Card border="light" style={{ width: "23.75%", maxHeight: "500px", backgroundColor: "#a996f5" }}>
      <Card.Header
        style={{
          fontWeight: "600",
          fontSize: "40px",
          color: "white",
          backgroundColor: "#7217bc",
          textAlign: "center",
          height: "70px",
        }}
      >
        {user?.name}
      </Card.Header>
      <Image
        variant="top"
        style={{ width: "90%", height: "180px", margin: "10px auto 0" }}
        className=""
        src={`http://localhost:5001/${user?.profile}`}
        alt="유저 프로필 사진"
        rounded
      />
      <Card.Body>
        <Button
          variant=""
          style={{ width: "100%", backgroundColor: "#6722c7", color: "white", fontWeight: "550" }}
          onClick={handleShow}
        >
          Introduce
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{user?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{user?.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
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
                    marginBottom: "20px",
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
              marginBottom: "30px",
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
          style={{ fontWeight: "600", backgroundColor: "#e7dcff", textAlign: "center" }}
        >
          {user?.email}
        </Card.Footer>
        {<br />}
      </Card.Body>
    </Card>
</>
    

    

    // <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
    //   <Card.Body>
    //     <Row className="justify-content-md-center">
    //       <Card.Img
    //         style={{ width: "10rem", height: "8rem" }}
    //         className="mb-3"
    //         src="http://placekitten.com/200/200"
    //         alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
    //       />
    //     </Row>
    //     <Card.Title>{user?.name}</Card.Title>
    //     <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
    //     <Card.Text>{user?.description}</Card.Text>

    //     {isEditable && (
    //       <Col>
    //         <Row className="mt-3 text-center text-info">
    //           <Col sm={{ span: 20 }}>
    //             <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
    //             편집</Button>
    //           </Col>
    //         </Row>
    //       </Col>
    //     )}

    //     {isNetwork && (
    //       <Card.Link
    //         className="mt-3"
    //         href="#"
    //         onClick={() => navigate(`/users/${user.id}`)}
    //       >
    //         포트폴리오
    //       </Card.Link>
    //     )}
    //   </Card.Body>
    // </Card>
  );
}




export default UserCard;
