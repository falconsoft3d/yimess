import React, { useState } from 'react';
import Link from "next/link";
import {
    Flex,
    IconButton,
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiLogOut,
    FiPhoneOutgoing
} from 'react-icons/fi';
import NavItem from '../NavItem';

export default function Sidebar({logout}) {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <Link href="/dashboard"><a><NavItem navSize={navSize} icon={FiPhoneOutgoing} title="Providers" /></a></Link>
                <Link href="/"><a><NavItem navSize={navSize} icon={FiHome} title="Home" /></a></Link>
                {/* <NavItem navSize={navSize} onClick={logout} icon={FiLogOut} title="Log Out" /> */}
            </Flex>

            
        </Flex>
    )
}