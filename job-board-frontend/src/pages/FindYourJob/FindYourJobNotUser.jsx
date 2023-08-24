import React from "react";
import FilterAndJob from "../../components/FilterAndJob/FilterAndJob";
import FindYourJob from "../../components/FindYourJob/FindYourJob";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function FindYourJobNotUser() {
  return (
    <div>
      <Navbar />
      <FindYourJob />
      <FilterAndJob />
      <Footer />
    </div>
  );
}
