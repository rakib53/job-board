import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useGetCompanyInformationQuery } from "../features/companySlice/companyApi";
import { getCompanyInfo } from "../features/companySlice/companySlice";

export default function PrivateEmployeer({ children }) {
  const { user } = useSelector((state) => state.authSlice);
  const location = useLocation();
  // Getting the company ID
  const {
    data: companyInfo,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetCompanyInformationQuery({ companyId: user?.companyId });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && companyInfo?.companyInfo?._id) {
      dispatch(getCompanyInfo(companyInfo?.companyInfo));
    }
  }, [isLoading, companyInfo?.companyInfo?._id]);

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
