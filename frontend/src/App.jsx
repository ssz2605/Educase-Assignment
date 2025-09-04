import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StarterPage from "./pages/StarterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<StarterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
