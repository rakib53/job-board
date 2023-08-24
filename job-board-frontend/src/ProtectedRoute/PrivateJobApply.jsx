import { useSelector } from "react-redux";

export default function PrivateJobApply({ children }) {
  const { user } = useSelector((state) => state.authSlice);

  if (user?._id && user?.accountCompeletation === 30) {
    return navigate(`/personal-info`, { replace: true, state: location });
  } else if (user?._id && user?.accountCompeletation === 70) {
    return navigate(`/preference`, { replace: true, state: location });
  }
  return navigate(`/applciation/form/${jobId}`, {
    replace: true,
    state: location,
  });
}
