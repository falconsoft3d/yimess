import React, { useState } from "react";
import { ReactNode } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import FrontLayout from "../layouts/FrontLayout";

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
import useAuth from "../hooks/useAuth";

import Footer from '../components/Front/Footer';
export default function Home() {
  const { logout, auth, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);
  return (
    <>
      <FrontLayout >
        <h1>Front</h1>
      </FrontLayout>
    </>)
}
