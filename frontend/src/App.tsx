
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail_updated";
import Appointment from "./pages/Appointment";
import Doctor from "./pages/Doctor";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminClinicSettings from "./pages/AdminClinicSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route
          path="/services/:slug"
          element={<ServiceDetail />}
        />
        <Route
          path="/appointment"
          element={<Appointment />}
        />

        {/* Admin */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/settings"
          element={<AdminClinicSettings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
