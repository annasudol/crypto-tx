import { Box, Divider, Heading, Text, useToast } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import axios, { AxiosRequestConfig } from 'axios'
import { TransactionItem } from './TransactionItem'
import { ITxData } from 'types'
import PaginationControlled from './PG'

import { useEffect, useState } from 'react'
const NEXT_POLYSCAL_API_KEY = process.env.NEXT_POLYSCAL_API_KEY!!

export const TransactionList: React.FC = () => {
  const { address } = useAccount()
  const toast = useToast()
  const [txData, setTxData] = useState<ITxData[]>([])
  const [page, setPage] = useState<number>(1)
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

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
          setTxData(result.data.result)
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

  return (
    <div>
      {/* {txData.map((data) => {
        return <TransactionItem {...data} />
      })} */}
      <PaginationControlled />
    </div>
  )
}
