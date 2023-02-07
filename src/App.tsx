import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages";
import Services from "./pages/Services";
import Emergency from "./pages/Emergency";
import DetailedReporting from "./pages/DetailedReporting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prevention from "./pages/Prevention";
import ContactUs from "./pages/ContactUs";
import Donate from "./pages/Donate";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Users from "./contexts/Users";
import DashboardContext from "./contexts/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Messages from "./pages/dashboard/Messages";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminSettings from "./pages/admin/AdminSettings";
import CaseStatus from "./pages/dashboard/CaseStatus";
import Report from "./pages/dashboard/Report";
import UserDashboardReport from "./pages/dashboard/UserDashboardDonate";
import Success from "./pages/Success";
import { ToastContainer } from "react-toastify";
import AdminAdmins from "./pages/admin/AdminAdmins";

function App() {
  return (
    <div className="App flex flex-col">
      <Router>
        <DashboardContext>
          <Users>
            <Header />
            <main className=" mt-20">
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/report/emergency" element={<Emergency />} />
                <Route
                  path="/report/detailed-reporting"
                  element={<DetailedReporting />}
                />
                <Route path="/report/faq" element={<FAQ />} />
                <Route path="/report/support" element={<Support />} />
                <Route path="/prevention" element={<Prevention />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/case-status" element={<CaseStatus />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/administrators" element={<AdminAdmins />} />
                <Route path="/admin/partners" element={<AdminPartners />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/report" element={<Report />} />
                <Route path="/make-payment" element={<UserDashboardReport />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </main>
          </Users>
        </DashboardContext>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
