import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../features/auth/authApi";
import { getUserInfo } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { token, user } = useSelector((state) => state.authSlice);
  const { data: userData, isLoading, isError } = useGetUserInfoQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if ((!isLoading && isError) || !token) {
      setIsAuth(true);
    }

    if (!isLoading && !isError && userData?.user?._id) {
      dispatch(getUserInfo(userData?.user));
      setIsAuth(true);
    }
  }, [isError, isLoading, userData?.user, userData?.user?._id]);

  return isAuth;
};

export default useAuthCheck;
