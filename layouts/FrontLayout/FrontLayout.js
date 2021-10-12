import React from 'react';
import Head from 'next/head';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,Box,useColorModeValue,SimpleGrid,
    IconProps,
  } from '@chakra-ui/react';

import Footer from '../../components/Front/Footer';
import Navbar from '../../components/Front/Navbar'



export default function FrontLayout(props) {
    const { children } = props;
    return (
        <div>
        <Head>
            <title>YiMess: API</title>
            <meta name="description" content="url shortener" />
            <link rel="icon" href="/favicon.ico" />
            <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
            rel="stylesheet"
            />
        </Head>
        <Navbar/>
        <Container className="content" maxW={"5xl"}>
                {children}
        </Container>
        <Footer/>
        </div>
    )
}
