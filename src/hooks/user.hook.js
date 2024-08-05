import { useSelector } from "react-redux";

export const useUser = () => {
  const { token, user } = useSelector((state) => state.auth);

  return {token, user}
};