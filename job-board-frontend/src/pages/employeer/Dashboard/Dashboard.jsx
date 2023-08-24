import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // const { user } = useSelector((state) => state.authSlice);
  // const {
  //   data: companyInfo,
  //   isLoading,
  //   isError,
  //   error,
  //   isSuccess,
  // } = useGetCompanyInformationQuery({ companyId: user?.companyId });
  // const { companyInfo: companyData } = useSelector(
  //   (state) => state.companySlice
  // );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isLoading && companyInfo?.companyInfo?._id) {
  //     dispatch(getCompanyInfo(companyInfo?.companyInfo));
  //   }
  // }, [isLoading, companyInfo?.companyInfo?._id]);

  const { companyInfo } = useSelector((state) => state.companySlice);

  console.log(companyInfo);

  return <div>This is Employeer Dashboard Page {companyInfo?.companyName}</div>;
}
