import Axios from "axios";
import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";

function LandingPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.post("/api/product/products");
        console.log(result.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <main>
      <></>
    </main>
  );
}

export default LandingPage;
