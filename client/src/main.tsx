import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
// import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import Place from "./pages/Place/Place.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import SubmitPlace from "./pages/SubmitPlace/SubmitPlace.tsx";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.tsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword.tsx";
import AuthLayout from "./components/layouts/AuthLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="places/:placeId" element={<Place />} />
        <Route path="places/submit" element={<SubmitPlace />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
