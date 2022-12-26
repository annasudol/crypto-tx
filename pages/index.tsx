import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { useAccount, useProvider } from 'wagmi'
import { Layout } from '../components/layout/Layout'
import { useIsMounted } from '../hooks/useIsMounted'
import axios from 'axios'
import { AppConfig } from '@/utils/AppConfig'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { address } = useAccount()
  useEffect(() => {
    const url = `https://api-testnet.polygonscan.com/api`

    axios
      .get(
        'https://api-testnet.polygonscan.com/api',
        {
          module: 'account',
          action: 'txlist',
          address: '0x756212f2Eb2cbd97CAc8B8f16ff044fe6281FDcf',
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: 'WUFIHMN5Z6KEG518REMKFMD928HKSS4KWT',
        },
        { 'Content-Type': 'application/x-www-form-urlencoded' }
      )
      .then(function (response) {
        // handle success
        console.log(response)
      })
    //   sendRequest(url, method, body) {
    //     const options = {
    //         method: method,
    //         headers: new Headers({'content-type': 'application/json'}),
    //         mode: 'no-cors'
    //     };

    //     options.body = JSON.stringify(body);

    //     return fetch(url, options);
    // }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // setTimeout(() => setStory(data), 1500)
        console.log('Success ', data)
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }, [])

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
