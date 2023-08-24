import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function StudentPrivateRoute({ children }) {
  const { user } = useSelector((state) => state.authSlice);

  if (user?._id && user?.role === "jobSeeker") {
    return children;
  } else {
    return <Navigate to={"/"} replace={true} />;
  }
}
