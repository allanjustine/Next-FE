"use client";

import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const BaseContent = ({ children }: any) => {
  const { hasHigherRole, hasNormalRole }: any = useAuth();

  if (hasHigherRole) {
    return (
      <>
        <SideBar children={children} />
      </>
    );
  }

  if (hasNormalRole) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }
};

export default BaseContent;
