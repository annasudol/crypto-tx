import { Box, Divider, Heading, Text, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { Layout } from '../components/layout/Layout'
import axios, { AxiosRequestConfig } from 'axios'
import { AppConfig } from '@/utils/AppConfig'
import { useIsMounted } from '@/hooks/useIsMounted'

import { useEffect } from 'react'
const NEXT_POLYSCAL_API_KEY = process.env.NEXT_POLYSCAL_API_KEY!!

const Home: NextPage = () => {
  const { address } = useAccount()
  const { isMounted } = useIsMounted()
  const toast = useToast()

  useEffect(() => {
    const url = `https://api-testnet.polygonscan.com/api`
    const params = {
      module: 'account',
      action: 'txlist',
      address,
      startblock: 0,
      endblock: 99999999,
      apikey: NEXT_POLYSCAL_API_KEY,
    }

    async function getTransactionsData(): Promise<Array<any>> {
      const options: AxiosRequestConfig = {
        method: 'GET',
        url,
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

      try {
        const result = await axios(options)
        if (
          result.status === 200 &&
          result.data &&
          result.data.message === 'OK'
        ) {
          console.log(result.data)
          return result.data
        } else {
          toast({
            title: 'failed fetching data',
            description: <Text>{result.status}</Text>,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
        return []
      } catch (error: any) {
        toast({
          title: 'Error fetching data',
          description: <Text>{error.code || error.response.status}</Text>,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return []
      }
    }
    address && getTransactionsData()
  }, [])
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
