import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home.tsx";
import Place from "./pages/Place/Place.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import SubmitPlace from "./pages/SubmitPlace/SubmitPlace.tsx";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.tsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword.tsx";
import AuthLayout from "./components/layouts/AuthLayout.tsx";
import MainLayout from "./components/layouts/MainLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute.tsx";
import OnboardUserDialog from "./components/OnboardUserDialog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <OnboardUserDialog />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="places/:placeId" element={<Place />} />
            <Route element={<ProtectedRoute />}>
              <Route path="places/submit" element={<SubmitPlace />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
