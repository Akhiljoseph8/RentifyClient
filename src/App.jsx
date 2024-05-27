import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
