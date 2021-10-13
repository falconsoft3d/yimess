import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { Flex } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

export default function AdminLayout(props) {
  const { children } = props;
  const { logout, auth, setReloadUser } = useAuth();
  return (
    <>
      <Flex w="100%">
        <Sidebar logout={logout}/>
        <Flex
          ml={10} mt={10}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
