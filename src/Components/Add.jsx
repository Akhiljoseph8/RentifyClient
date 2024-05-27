import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { addProperty } from "../services/allApis";
import { toast } from "react-toastify";
import { addPropertyResponseContext } from "../Context_api/ContextShare";
function Add() {
  const { addResponse, setAddResponse } = useContext(
    addPropertyResponseContext
  );

  const [show, setShow] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [preview, setPreview] = useState("");
  const [property, setProperty] = useState({
    name: "",
    place: "",
    rent: "",
    bedroom: "",
    bathroom: "",
    hospital: "",
    college: "",
    image: "",
  });
  useEffect(() => {
    if (property.image) {
      if (
        property.image.type == "image/jpg" ||
        property.image.type == "image/jpeg" ||
        property.image.type == "image/png"
      ) {
        setImageStatus(false);
        setPreview(URL.createObjectURL(property.image));
      } else {
        setImageStatus(true);
        setPreview("");
        setProperty({
          name: "",
          place: "",
          rent: "",
          bedroom: "",
          bathroom: "",
          hospital: "",
          college: "",
          image: "",
        });
      }
    }
  }, [property.image, addResponse]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAddProperty = async () => {
    const { name, place, rent, bedroom, bathroom, hospital, college, image } =
      property;

    if (!name || !place || !rent || !bedroom || !bathroom || !image) {
      toast.error("Invalid input")
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("place", place);
      formData.append("rent", rent);
      formData.append("bedroom", bedroom);
      formData.append("bathroom", bathroom);
      formData.append("image", image);
      formData.append("hospital", hospital);
      formData.append("college", college);

      const header = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      const result = await addProperty(formData, header);
      if (result.status == 200) {
        toast.success("Property added successfully");
        setProperty({
          name: "",
          place: "",
          rent: "",
          bedroom: "",
          bathroom: "",
          hospital: "",
          college: "",
          image: "",
        });
        setPreview("");
        setAddResponse(result);
        handleClose();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Sell property
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sell property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img">
                <input
                  type="file"
                  id="img"
                  onChange={(e) =>
                    setProperty({ ...property, image: e.target.files[0] })
                  }
                  style={{ display: "none" }}
                ></input>
                <img
                  className="img-fluid"
                  src={
                    preview
                      ? preview
                      : "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png"
                  }
                  alt=""
                />
              </label>
              {imageStatus && (
                <p className="text-danger">file format is not supported</p>
              )}
            </Col>
            <Col>
              <FloatingLabel
                controlId="Name"
                label="Property name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setProperty({ ...property, name: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel controlId="Place" label="Place" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Place"
                  onChange={(e) =>
                    setProperty({ ...property, place: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel controlId="Rent" label="Rent" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Rent"
                  onChange={(e) =>
                    setProperty({ ...property, rent: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Bedroom"
                label="Bedroom"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Number of bedroom"
                  onChange={(e) =>
                    setProperty({ ...property, bedroom: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
            <FloatingLabel
              controlId="Bathroom"
              label="Bathroom"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Number of bathroom"
                onChange={(e) =>
                  setProperty({ ...property, bathroom: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="Hospital"
              label="Hospital"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Nearby hospital"
                onChange={(e) =>
                  setProperty({ ...property, hospital: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId="Colloge" label="College" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nearby college"
                onChange={(e) =>
                  setProperty({ ...property, college: e.target.value })
                }
              />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProperty}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
