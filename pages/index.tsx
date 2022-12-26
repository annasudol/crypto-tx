import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { useAccount, useProvider } from 'wagmi'
import { Layout } from '../components/layout/Layout'
import { useIsMounted } from '../hooks/useIsMounted'

import { AppConfig } from '@/utils/AppConfig'

const Home: NextPage = () => {
  const { isMounted } = useIsMounted()

  const { address } = useAccount()

  const provider = useProvider()

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        {AppConfig.site_name}
      </Heading>
      <Text fontSize="lg" mb="4">
        {AppConfig.description}
      </Text>

      <Text mt="8" fontSize="xl">
        This page only works only on the Polygon Mumbai Testnet
      </Text>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Divider my="8" borderColor="gray.400" />

        <Divider my="8" borderColor="gray.400" />
        <Box></Box>
      </Box>
    </Layout>
  )
}

export default Home
