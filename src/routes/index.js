import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
// import PrivateRoute from "./PrivateRoute";
// import ProfilePage from "../pages/ProfilePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route exact path="/login" element={<LoginPage />} />
        {/* <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        /> */}
        <Route exact path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
export default AllRoutes;
