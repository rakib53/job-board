import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginProtectedRoute({ children }) {
  //   const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.authSlice);
  const location = useLocation();

  if (location?.state?.jobId && user?.accountCompeletation === 100) {
    return (
      <Navigate
        to={`/applciation/form/${location?.state?.jobId}`}
        replace={true}
      />
    );
  } else if (!token || !user?._id) {
    return <Navigate to="/" replace={true} />;
  } else if (token && user?._id) {
    return children;
  }
}
