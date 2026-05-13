import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/page";
import PrivacyPolicy from "./app/privacy/page";
import TermsOfService from "./app/terms/page";
import AdminPage from "./app/admin/page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/admin" element={<AdminPage searchParams={Promise.resolve({})} />} />
        <Route path="/portal" element={<Navigate to="/#hero-cta" replace />} />
        <Route path="/checkout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
