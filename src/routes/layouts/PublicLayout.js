import React from "react";
import { Outlet } from "react-router-dom";

import AlertMsg from "./AlertMsg";

const PublicLayout = () => {
  return (
    <>
      <AlertMsg />
      <Outlet />
    </>
  );
};

export default PublicLayout;
