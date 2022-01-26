import React, { useState, useEffect } from "react";
import Axios from "axios";
import Admin from "../components/Admin";
import Vister from "../components/Vister";

export default function Dash() {
  const [role, setRole] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((res) => {
      if (res.data) {
        setRole(res.data[0].role);
      }
    });
  }, []);
  return (
    <>
      <h1>
        {role === "admin" && <Admin />} {role === "user" && <Vister />}
      </h1>
    </>
  );
}
