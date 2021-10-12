import React, { useState } from "react";
import { ReactNode } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import FrontLayout from "../layouts/FrontLayout";

import {
  Flex,
  Container,Grid,
  Heading,
  Stack,
  Text,
  Link as LinkChakra, 
  Button,
  Icon,Box,useColorModeValue,SimpleGrid,
  IconProps,
} from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";

import Footer from '../components/Front/Footer';
export default function Home() {
  const { logout, auth, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);
  return (
    <>
      <FrontLayout bg="#E4EEE0" auth={auth} logout={logout}>

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <Box w="100%" h="10" p={10}><Image src="/phone.png" width="300" height="600"alt="phone"/>  </Box>
          <Box w="100%" h="10">

          <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
             { process.env.NAME_APP ? process.env.NAME_APP : "ERROR ENV"}<br />
            <Text as={'span'} color={'green.400'} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}>
                Api to send messages with whatsapp
            </Text>
          </Heading>
          
          <Stack
            direction={'column'}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Flex>  
              <Text color={'gray.500'} mr={2}>Marlon Falcon Hernández</Text>
              <LinkChakra href="http://www.marlonfalcon.com"> 
                  <a>www.marlonfalcon.com</a>  
              </LinkChakra>
            </Flex>
          </Stack>

        </Stack>

          </Box>
        </Grid>

      

       

        
      </FrontLayout>
    </>)
}
