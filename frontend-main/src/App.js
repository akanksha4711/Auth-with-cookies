import { useEffect } from "react";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMe } from "./slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
