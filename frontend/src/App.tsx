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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
