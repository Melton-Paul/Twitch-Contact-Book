import React from "react";
import Navbar from "./components/NavBar/Navbar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";

export default function App() {
  const context = React.useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!context.isLoggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<LoginPage />} />
          </>
        )}
        {context.isLoggedIn && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
