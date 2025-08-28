import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import AdminSidebar from "../features/Admin/AdminSidebar";
import Header from "../Components/Header";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload as DefaultJwtPayload } from "jwt-decode";

type Props = {
  children: React.ReactNode;
};

interface CustomJwtPayload extends DefaultJwtPayload {
  role?: string;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);


  const token = sessionStorage.getItem("token"); 
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp <= now) {

        sessionStorage.removeItem("token");
      } else if (decoded.role === "ADMIN") {
        isAdmin = true;
      }
    } catch (error) {
      console.error("JWT invalide", error);
      sessionStorage.removeItem("token");
    }
  }

  if (!isAdmin) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <>
      <Header />
      <Box h="100vh" pt="95px">
        <HStack spacing={0} align="start" h="100%">
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Box
            flex="1"
            p={6}
            h="calc(100vh - 95px)"
            overflowY="auto"
            bg={"white"}
          >
            {children}
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default AdminLayout;
