import React from "react";
import Link from "next/link";

import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";


export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { auth, logout } = props;

  console.log(auth);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="#138172"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          { process.env.NAME_APP }
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="https://github.com/falconsoft3d/yimess">Git</Link>
        <Link href="https://github.com/falconsoft3d/">Author</Link>
        <Link href="/dashboard">Dashboard</Link>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >

        <IconButton
          mr={2}
          px={6}
          _hover={{
            bg: "green.500",
          }}
          onClick={toggleColorMode}
          icon={<MoonIcon />}
        />
     {!auth && (
              <>
            <Link href="/register">
                <Button
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                >
                Register
                </Button>
            </Link>
            
            <Link href="/login">
                <Button
                variant="outline" ml={2}
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                >
                Login
                </Button>
            </Link>
        </>
        )}


        {auth && (
              <>
                <Button onClick={logout} 
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                >
                Logout
                </Button>
        </>
        )}

      </Box>
    </Flex>
  );
}
