import { useSelector } from "react-redux";

export const Home = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <h1>Please log in</h1>;
  }

  return <h1>Welcome, {user.name}</h1>;
};
