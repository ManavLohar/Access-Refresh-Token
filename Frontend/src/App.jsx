import React from "react";
import { axiosInstance } from "./config/axiosInstance";

const App = () => {
  let getData = async () => {
    try {
      let res = await axiosInstance.get("/products");
      console.log(res);
    } catch (error) {
      console.log("Error in api", error);
    }
  };

  getData();
  return <div>Hey cohort gang...</div>;
};

export default App;
