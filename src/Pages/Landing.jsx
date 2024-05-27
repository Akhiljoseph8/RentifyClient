import React, { useEffect, useState, useContext } from "react";
import Add from "../Components/Add";
import Header from "../Components/Header";
import PropertyCard from "../Components/PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getProperty,
  getUserProperty,
  getOtherProperty,
} from "../services/allApis";
import {
  onNavigateNext,
  onNavigatePrev,
} from "../redux/slices/propertySlice";
import {
  addPropertyResponseContext,
  editPropertyResponseContext,
  deletePropertyResponseContext,
  likePropertyResponseContext,
} from "../Context_api/ContextShare";

function Landing() {
  const dispatch = useDispatch();

  const { addResponse, setAddResponse } = useContext(
    addPropertyResponseContext
  );
  const { editResponse, setEditResponse } = useContext(
    editPropertyResponseContext
  );
  const { deleteResponse, setDeleteResponse } = useContext(
    deletePropertyResponseContext
  );
  const { likeResponse, setLikeresponse } = useContext(
    likePropertyResponseContext
  );

  const { properties, currentPage, propertyPerPage } = useSelector(
    (state) => state.propertyReducer
  );
  
  const [logStatus, setLogStatus] = useState(false);
  const [property, setProperty] = useState([]);
  const [userProperty, setUserProperty] = useState([]);

  const totalPages = Math.ceil(property?.length / propertyPerPage);
  const indexOfLastItem = currentPage * propertyPerPage;
  const indexOfFirstItem = indexOfLastItem - propertyPerPage;
  const validCards = property?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
    setProperty(properties);
    getData();
    
  }, [logStatus, addResponse, editResponse, deleteResponse, likeResponse]);

  //Funtion for Geting detaials from database
  const getData = async () => {
    if (logStatus) {
      const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const userId = sessionStorage.getItem("userId");
      const res = await getOtherProperty(header);
      if ((res.status = 200)) {
        setProperty(res.data);
        setAddResponse("ok")
      } else {
        
      }
    } else {
      const result = await getProperty();
      if ((result.status = 200)) {
        setProperty(result.data);
       
      } else {
        console.log(result.response.data);
      }
    }
    const header = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const res = await getUserProperty(header);

    if (res.status == 200) {
      setUserProperty(res.data);
    } else {
    }
  
  };


  //landing page navigation
  const navigatePrev = () => {
    if (currentPage != 1) {
      dispatch(onNavigatePrev());
    }
  };
  const navigateNext = () => {
    if (currentPage != totalPages) {
      dispatch(onNavigateNext());
    }
  };

  return (
    <>
      <div className="">
        {logStatus ? <Header status={true} /> : <Header />}

        <Add />
        <div className="p-5">
          <h3 className="text-center">Few properties for you</h3>
          <div className="d-flex justify-content-evenly mt-3">
            {validCards.length > 0 ? (
              validCards.map((item) => <PropertyCard property={item} />)
            ) : (
              <h3 className="text-center text-danger">No properties available</h3>
            )}
          </div>
          <div className="text-center">
            <button className="btn" onClick={navigatePrev}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <span>
              {currentPage}/{totalPages}
            </span>
            <button className="btn" onClick={navigateNext}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>

        {userProperty.length > 0 ? (
          <div className="p-5">
            <h3 className="text-center">My properties</h3>
            <div className="d-flex justify-content-evenly mt-3">
              {userProperty.map((item) => (
                <PropertyCard property={item} userStatus={true} />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Landing;
