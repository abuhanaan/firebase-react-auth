import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./Login";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
