import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import base_url from "../services/server_url";
import Edit from "./Edit";
import { removeProperty, sellerData, mail, like } from "../services/allApis";
import { toast } from "react-toastify";
import {
  deletePropertyResponseContext,
  likePropertyResponseContext,
} from "../Context_api/ContextShare";
function PropertyCard({ property, userStatus }) {
  const { deleteResponse, setDeleteResponse } = useContext(
    deletePropertyResponseContext
  );
  const { likeResponse, setLikeResponse } = useContext(
    likePropertyResponseContext
  );
  const [show, setShow] = useState(false);
  const [seller, setSeller] = useState({ username: "", email: "", phone: "" });
  const handleClose = () => setShow(false);

  //Function for getting seller details and mail setup
  const handleShow = async (userId) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const res = await sellerData({ userId }, header);
    if (res.status == 200) {
      setSeller({
        username: res.data.username,
        email: res.data.email,
        phone: res.data.phone,
      });
      const user = sessionStorage.getItem("username");
    } else {
      toast(res.response.data);
    }
    const result = await mail({ userId }, header);
    if (result.status == 200) {
      setShow(true);
    }
  };

  //Function for handling property delete
  const handleDelete = async (id) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await removeProperty(header, id);
    if (result.status == 200) {
      setDeleteResponse(result);
      toast.success("Property deleted Successfully");
    } else {
      toast.error("deletion failed");
    }
  };

//Function for handling Like
  const handleLike = async (propertyId) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const res = await like({ propertyId }, header);

    if (res.status == 200) {
      setLikeResponse(res);
    } else {
      toast.error(res.response.data);
    }
  };

  return (
    <>
      <div>
        <Card style={{ width: "20rem" }}>
          <Card.Img
            className="img-fluid"
            variant="top"
            src={`${base_url}/uploads/${property.image}`}
            style={{ height: "12rem" }}
          />
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{property.name}</Card.Title>
                <Card.Text>{property.place}</Card.Text>
                <Card.Text>
                  {" "}
                  <i className="fa fa-inr"></i> {property.rent}
                </Card.Text>
              </Col>
              <Col>
                {userStatus ? (
                  <div>
                    <Edit property={property} />{" "}
                    <i
                      onClick={() => {
                        handleDelete(property._id);
                      }}
                      className="fa-solid fa-trash fa-2xl"
                    ></i>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleShow(property.userId);
                      }}
                    >
                      I am interested
                    </button>
                  </div>
                )}
                <Card.Text>Bedroom:{property.bedroom}</Card.Text>
                <Card.Text>Bathroom:{property.bathroom}</Card.Text>
              </Col>
              <Card.Text>Nearby Hospital: {property.hospital}</Card.Text>
              <Card.Text>Nearby College: {property.college}</Card.Text>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                {userStatus ? (
                  <Card.Text>Likes: {property.likes}</Card.Text>
                ) : (
                  <i
                    onClick={() => handleLike(property._id)}
                    class="fa-regular fa-thumbs-up"
                  >
                    {" "}
                    {property.likes}
                  </i>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{property.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <img
                  className="img-fluid"
                  src={`${base_url}/uploads/${property.image}`}
                  alt=""
                />
              </Col>
              <Col>
                <h3>Seller Details</h3>
                <h4>Name: {seller.username}</h4>
                <h4>Mail: {seller.email}</h4>
                <h4>Phone: {seller.phone}</h4>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default PropertyCard;
