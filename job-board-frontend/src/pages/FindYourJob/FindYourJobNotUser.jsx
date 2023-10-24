import React, { useEffect } from "react";
import FilterAndJob from "../../components/FilterAndJob/FilterAndJob";
import FindYourJob from "../../components/FindYourJob/FindYourJob";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function FindYourJobNotUser() {
  useEffect(() => {
    document.title = "Find Your job";
  });
  return (
    <div>
      <Navbar />
      <FindYourJob />
      <FilterAndJob />
      <Footer />
    </div>
  );
}
