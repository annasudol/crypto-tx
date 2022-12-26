import { Text, useToast, Stack } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
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
import { useEffect, useMemo, useState } from 'react'
const NEXT_POLYSCAL_API_KEY = process.env.NEXT_POLYSCAL_API_KEY!!

export const TransactionList: React.FC = () => {
  const { address } = useAccount()
  const toast = useToast()
  const [txData, setTxData] = useState<ITxData[]>([])
  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
  } = usePagination({
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
  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage)
  }
  console.log(txData, 'txData')

  return (
    <Stack>
      {paginate(txData, 3, currentPage).map((data) => {
        return <TransactionItem {...data} />
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
                w={7}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                fontSize="sm"
                _hover={{
                  bg: 'green.300',
                }}
                _current={{
                  bg: 'green.300',
                  fontSize: 'sm',
                  w: 7,
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
