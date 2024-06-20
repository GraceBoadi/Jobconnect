import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";

import {
  About,
  AllJobs,
  Auth,
  Company,
  Company_Profile,
  JobDetails,
  Upload_Jobs,
  User_Profile,
} from "./pages";
import { useSelector } from "react-redux";
import "./Normal.css"

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/all-jobs" replace={true} />}
          />
        </Route>

        <Route path="/about-us" element={<About />} />

        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/company" element={<Company />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/company-profiles/:id" element={<Company_Profile />} />
        <Route path="/user-profiles/:id" element={<User_Profile />} />
        <Route path="/upload-jobs" element={<Upload_Jobs />} />
      </Routes>
    </main>
  );
}

export default App;
