import { Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

import { Layout } from '../components/layout/Layout'

import { AppConfig } from '@/utils/AppConfig'
import { useIsMounted } from '@/hooks/useIsMounted'
import { TransactionList } from '../components/Transactions'

const Home: NextPage = () => {
  const { isMounted } = useIsMounted()

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
      <TransactionList />
    </Layout>
  )
}

export default Home
