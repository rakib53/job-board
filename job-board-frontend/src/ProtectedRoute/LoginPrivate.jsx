import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginPrivate({ children }) {
  const { user } = useSelector((state) => state.authSlice);
  const location = useLocation();

  return !user?._id ? (
    children
  ) : user?.role === "jobSeeker" ? (
    location?.state?.jobId && user?.accountCompeletation === 100 ? (
      <Navigate
        to={`/applciation/form/${location?.state?.jobId}`}
        replace={true}
      />
    ) : location?.state?.jobId && user?.accountCompeletation === 30 ? (
      <Navigate to={"/personal-info"} replace={true} state={location?.state} />
    ) : location?.state?.jobId && user?.accountCompeletation === 70 ? (
      <Navigate to={"/preference"} replace={true} state={location?.state} />
    ) : user?.accountCompeletation === 30 ? (
      <Navigate to={"/personal-info"} />
    ) : (
      <Navigate to={"/student/dashboard"} />
    )
  ) : (
    user?.role === "employeer" && <Navigate to={"/employeer/dashboard"} />
  );
}
