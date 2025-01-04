import React, { ReactNode } from 'react';
import Head from 'next/head';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import system from '../theme';
import Logo from '../public/Logo.svg';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Alitu Mic Check' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ChakraProvider value={system}>
      <Flex as="header" backgroundColor="purple.500" padding={6}>
        <Image src={Logo} alt="Alitu"></Image>
      </Flex>
      {children}
    </ChakraProvider>
  </div>
);

export default Layout;
