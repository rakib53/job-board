import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function EmployeerPrivateRoute({ children }) {
  const { user } = useSelector((state) => state.authSlice);

  if (user?._id && user?.role === "employeer") {
    return children;
  } else {
    return <Navigate to={"/"} replace={true} />;
  }
}
