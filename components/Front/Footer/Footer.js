import React from "react";
import { Flex, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
export default function Footer() {


  return (
    <footer>
       <Flex
      bg="#138172"
      width="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      boxShadow="0 -1px 6px -1px rgba(0, 0, 0, 0.1)"
      padding={4}
    >
      <HStack spacing={8} mb={8}>
        <Text color="gray.400">NextJs, Chakra-ui</Text>
      </HStack>
    </Flex>
    </footer>
  );
}
