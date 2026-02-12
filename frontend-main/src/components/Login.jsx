import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    dispatch(login({ email, password }));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
