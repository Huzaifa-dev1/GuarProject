// src/routes/AppRouter.jsx
import React, { Suspense } from "react"; // 👈 Import Suspense and React
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// ❌ OLD: Directly importing all pages, making the initial bundle large.
// import Home from "../pages/Home.jsx";
// import CompanyIntro from "../pages/introduction/CompanyIntro.jsx";
// ... (all other pages)

// ✅ NEW: Using React.lazy() to dynamically import pages only when needed.
const Home = React.lazy(() => import("../pages/Home.jsx"));
const CompanyIntro = React.lazy(() => import("../pages/introduction/CompanyIntro.jsx"));
const WhatIsGuar = React.lazy(() => import("../pages/introduction/WhatIsGuar.jsx"));
const AgGroup = React.lazy(() => import("../pages/introduction/AgGroup.jsx"));
const CeoMessage = React.lazy(() => import("../pages/introduction/CeoMessage.jsx"));

const GuarGum = React.lazy(() => import("../pages/products/GuarGum.jsx"));
const Alfalfa = React.lazy(() => import("../pages/products/Alfalfa.jsx"));

const Applications = React.lazy(() => import("../pages/Applications.jsx"));
const QualityControl = React.lazy(() => import("../pages/quality/QualityControl.jsx"));
const Certifications = React.lazy(() => import("../pages/quality/Certifications.jsx"));
const Contact = React.lazy(() => import("../pages/Contact.jsx"));

// scale and duration for changes//
const pageVariants = {
  initial: { opacity: 0, scale: 0.985 },
  in:      { opacity: 1, scale: 1.0 },
  out:     { opacity: 0, scale: 0.985 },
};

const pageTransition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.6, // was 0.45
};


function Page({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  // Define a simple fallback component to show while the chunk is loading
  // You might want a better-styled loading spinner or skeleton component here.
  const LoadingFallback = <div style={{ minHeight: '80vh', textAlign: 'center', padding: '50px' }}>Loading Content...</div>; 

  return (
    <AnimatePresence mode="wait">
      {/* 👈 Wrap Routes with Suspense */}
      <Suspense fallback={LoadingFallback}>
        <Routes location={location} key={location.pathname}>
          {/* Home */}
          <Route path="/" element={<Page><Home /></Page>} />

          {/* Introduction */}
          <Route path="/introduction/company" element={<Page><CompanyIntro /></Page>} />
          <Route path="/introduction/guar" element={<Page><WhatIsGuar /></Page>} />
          <Route path="/introduction/ag-group" element={<Page><AgGroup /></Page>} />
          <Route path="/introduction/ceo-message" element={<Page><CeoMessage /></Page>} />

          {/* Products */}
          <Route path="/product/guar-gum" element={<Page><GuarGum /></Page>} />
          <Route path="/product/alfalfa" element={<Page><Alfalfa /></Page>} />

          {/* Applications */}
          <Route path="/applications" element={<Page><Applications /></Page>} />

          {/* Quality */}
          <Route path="/quality/quality-control" element={<Page><QualityControl /></Page>} />
          <Route path="/quality/certifications" element={<Page><Certifications /></Page>} />

          {/* Contact */}
          <Route path="/contact" element={<Page><Contact /></Page>} />

          {/* Fallback */}
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}