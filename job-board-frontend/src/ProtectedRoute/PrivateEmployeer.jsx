import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateEmployeer({ children }) {
  const { user } = useSelector((state) => state.authSlice);
  const location = useLocation();

  if (user?.companyId) {
    return children;
  } else {
    return (
      <Navigate
        to={"/employeer/organization"}
        state={{ from: location }}
        replace={true}
      />
    );
  }
}
