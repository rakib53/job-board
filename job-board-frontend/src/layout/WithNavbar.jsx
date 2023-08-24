import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function WithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
