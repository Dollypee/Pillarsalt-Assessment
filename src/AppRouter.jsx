import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Wallet from "./pages/customer/Wallet";
import Register from "./pages/auth/Register";
import VerifyAccount from "./pages/auth/VerifyAccount";
import Profile from "./pages/customer/Profile";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
// Import other components for routes

const AppRouter = () => (
  <Router>
    <ToastContainer />
    <Routes>

      {/* Routes not needing authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/verifyaccount" element={<VerifyAccount />} />

      {/* Routes needing authentication */}
      <Route
        path="dashboard"
        element={<ProtectedRoute>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </ProtectedRoute>}
      >
        <Route path="wallet" element={<Wallet />} />
      </Route>
      <Route
        path="user"
        element={<ProtectedRoute>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </ProtectedRoute>}
      >
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;