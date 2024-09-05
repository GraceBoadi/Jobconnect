import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  About,
  AllJobs,
  Auth,
  Company,
  Company_Profile,
  Dashboard,
  JobDetails,
  Upload_Jobs,
  User_Profile,
} from "./pages";
import { useSelector } from "react-redux";
import "./Normal.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);

  console.log("user", user);
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/all-jobs" replace={true} />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-profile/:id" element={<User_Profile />} />
          <Route path="/company-profile/:id" element={<Company_Profile />} />
          <Route path="/upload-job" element={<Upload_Jobs />} />

          <Route path="/about-us" element={<About />} />
        </Route>

        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/company" element={<Company />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
      </Routes>
      <ToastContainer bodyClassName="toastify-content" />
    </main>
  );
}

export default App;
