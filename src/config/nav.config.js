// src/config/nav.config.js
const NAV = [
  { label: "HOME", to: "/" },
  {
    label: "INTRODUCTION",
    children: [
      { label: "Company Introduction", to: "/introduction/company" },
      { label: "Guar?", to: "/introduction/guar" },
      { label: "AG Group of Industries", to: "/introduction/ag-group" },
      { label: "CEO Message", to: "/introduction/ceo-message" },
    ],
  },
  {
    label: "PRODUCT",
    children: [
      { label: "Guar Gum", to: "/products/guar-gum" },
      { label: "Guar Refined Splits", to: "/products/guar-refined-splits" },
      { label: "Guar Meal", to: "/products/guar-meal" },
      // { label: "Alfalfa", to: "/products/alfalfa" }, // optional
    ],
  },
  { label: "APPLICATIONS", to: "/applications" },
  {
    label: "QUALITY MANAGEMENT",
    children: [
      { label: "Quality Control", to: "/quality/quality-control" },
      { label: "Certifications", to: "/quality/certifications" },
    ],
  },
  { label: "CONTACT", to: "/contact" },
];

export default NAV;
