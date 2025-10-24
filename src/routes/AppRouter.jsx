// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Pages
import Home from "../pages/Home.jsx";
import CompanyIntro from "../pages/introduction/CompanyIntro.jsx";
import WhatIsGuar from "../pages/introduction/WhatIsGuar.jsx";
import AgGroup from "../pages/introduction/AgGroup.jsx";
import CeoMessage from "../pages/introduction/CeoMessage.jsx";

import GuarGum from "../pages/products/GuarGum.jsx";

import Alfalfa from "../pages/products/Alfalfa.jsx";

import Applications from "../pages/Applications.jsx";
import QualityControl from "../pages/quality/QualityControl.jsx";
import Certifications from "../pages/quality/Certifications.jsx";
import Contact from "../pages/Contact.jsx";

//scale and duration for changes//
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
  return (
    <AnimatePresence mode="wait">
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
