import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../Context_api/AuthContext";
import { useContext } from "react";

function Header({ status }) {
  const { authStatus, setAuthStatus } = useContext(tokenAuthContext);
  const usenavigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    
    location.reload();
  };
  const login = () => {
    usenavigate("/login");
   
  };
  const user = sessionStorage.getItem("username");
  return (
    <Navbar className="bg-body-tertiary d-flex justify-content-between">
      <Navbar.Brand className="ms-3 text-success" href="/">
        Rentify
      </Navbar.Brand>
      {status ? (
        <div>
          Welcome <span className="text-danger">{user} </span>
          <button className="btn btn-danger me-4 rounded" onClick={logout}>
            LogOut <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      ) : (
        <button onClick={login} className="btn btn-success">
          Login
        </button>
      )}
    </Navbar>
  );
}

export default Header;
