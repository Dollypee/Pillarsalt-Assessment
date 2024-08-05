import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { useUser } from "../../hooks/user.hook";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useUser();


  if (!token) {
    // If no valid token is present, navigate to the login page
    navigate('/login')
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}