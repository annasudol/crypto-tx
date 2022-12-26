import { Text, useToast, Stack, Flex, Box } from '@chakra-ui/react'
import { useAccount, useConnect } from 'wagmi'
import axios, { AxiosRequestConfig } from 'axios'
import { TransactionItem } from './TransactionItem'
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination'

import { ITxData } from 'types'
import { paginate } from '@/utils/paginate'
import { useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
const NEXT_POLYSCAL_API_KEY = process.env.NEXT_POLYSCAL_API_KEY!!

export const TransactionList: React.FC = () => {
  const { address, connector, isConnected } = useAccount()
  const toast = useToast()
  const [txData, setTxData] = useState<ITxData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()
  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } =
    usePagination({
      total: txData.length,
      limits: { outer: 2, inner: 2 },
      initialState: {
        pageSize: 3,
        isDisabled: false,
        currentPage: 1,
      },
    })
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
      setIsLoading(true)
      try {
        const result = await axios(options)
        setIsLoading(false)
        console.log(result.data)
        if (
          result.status === 200 &&
          result.data &&
          result.data.message === 'OK'
        ) {
          setTxData(result.data.result)
          setMessage(undefined)
        } else {
          setMessage(result.data.message)
        }
      } catch (error: any) {
        toast({
          title: 'Error fetching data',
          description: <Text>{error.code || error.response.status}</Text>,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setIsLoading(false)
        return []
      }
    }
    address && getTransactionsData()
  }, [address, pagesCount])
  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage)
  }
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="md">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    )
  }
  if (message) {
    return (
      <Box height="150px" mb="2" bg="gray.100" rounded={'md'} padding="2">
        <Text
          fontSize="2xl"
          mb="1"
          textColor="gray.500"
          textAlign="center"
          mt="12"
        >
          {message}
        </Text>
      </Box>
    )
  }
  if (txData.length < 4) {
    return (
      <Stack>
        {paginate(txData, 3, currentPage).map((data) => {
          return <TransactionItem {...data} key={data.blockHash} />
        })}
      </Stack>
    )
  }
  return (
    <Stack>
      {paginate(txData, 3, currentPage).map((data) => {
        return <TransactionItem {...data} key={data.blockHash} />
      })}

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: 'yellow.400',
            }}
            bg="yellow.300"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                onClick={() => handlePageChange(currentPage + 1)}
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={page > 100 ? 12 : 7}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                fontSize="xs"
                _hover={{
                  bg: 'green.300',
                }}
                _current={{
                  bg: 'green.300',
                  fontSize: 'sm',
                  w: page > 100 ? '12' : 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: 'yellow.400',
            }}
            bg="yellow.300"
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Stack>
  )
}
