import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import base_url from "../services/server_url";
import { editProperty } from "../services/allApis";
import { toast } from "react-toastify";
import { editPropertyResponseContext } from "../Context_api/ContextShare";

function Edit({ property }) {
  const { editResponse, setEditResponse } = useContext(
    editPropertyResponseContext
  );
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [propertyData, setPropertyData] = useState({
    id: property._id,
    name: property.name,
    place: property.place,
    rent: property.rent,
    bedroom: property.bedroom,
    bathroom: property.bathroom,
    hospital: property.hospital,
    college: property.college,
    image: "",
  });

  useEffect(() => {
    if (propertyData.image) {
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
      }
    }
  }, [propertyData.image]);

 

  const handleClose = () => {
    setShow(false);
    setPropertyData({
      id: property._id,
      name: property.name,
      place: property.place,
      rent: property.rent,
      bedroom: property.bedroom,
      bathroom: property.bathroom,
      hospital: property.hospital,
      college: property.college,
      image: "",
    });
    setPreview("");
  };

  const handleShow = () => setShow(true);

  //Function for property edit handling
  const handleSubmit = async () => {
    const { name, place, rent, bedroom, bathroom, hospital, college, image } =
      propertyData;

    if (
      !name ||
      !place ||
      !rent ||
      !bedroom ||
      !bathroom ||
      !hospital ||
      !college
    ) {
      
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("place", place);
      formData.append("rent", rent);
      formData.append("bedroom", bedroom);
      formData.append("bathroom", bathroom);
      formData.append("hospital", hospital);
      formData.append("college", college);
      formData.append("image", image);
      if (preview) {
        const header = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        };
        const result = await editProperty(formData, header, propertyData.id);
        if (result.status == 200) {
          toast.success("Property Updated Successfully");
          setEditResponse(result);
          handleClose();
        } else {
          toast.error(result.response.data);
        }
      } else {
        const header = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        };
        const result = await editProperty(formData, header, propertyData.id);
        if (result.status == 200) {
          toast.success("Property Updated Successfully");
          setEditResponse(result);
          handleClose();
        } else {
          toast.error(result.response.data);
        }
      }
    }
  };

  return (
    <>
      <button className="btn ms-2" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square fa-2xl"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img">
                <input
                  type="file"
                  id="img"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setPropertyData({
                      ...projectData,
                      image: e.target.files[0],
                    })
                  }
                ></input>
                <img
                  className="img-fluid"
                  src={`${base_url}/uploads/${property.image}`}
                  alt=""
                />
              </label>
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
                  value={propertyData.name}
                  onChange={(e) =>
                    setPropertyData({ ...propertyData, name: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel controlId="Place" label="Place" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Place"
                  value={propertyData.place}
                  onChange={(e) =>
                    setPropertyData({ ...propertyData, place: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel controlId="Rent" label="Rent" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Rent"
                  value={propertyData.rent}
                  onChange={(e) =>
                    setPropertyData({ ...propertyData, rent: e.target.value })
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
                  value={propertyData.bedroom}
                  onChange={(e) =>
                    setPropertyData({
                      ...propertyData,
                      bedroom: e.target.value,
                    })
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
                value={propertyData.bathroom}
                onChange={(e) =>
                  setPropertyData({ ...propertyData, bathroom: e.target.value })
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
                value={propertyData.hospital}
                onChange={(e) =>
                  setPropertyData({ ...propertyData, hospital: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId="Colloge" label="College" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nearby college"
                value={propertyData.college}
                onChange={(e) =>
                  setPropertyData({ ...propertyData, college: e.target.value })
                }
              />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
