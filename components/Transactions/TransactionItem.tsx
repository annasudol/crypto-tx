import { Box, Divider, Heading, Text, useToast } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

import axios, { AxiosRequestConfig } from 'axios'
import { ITxData } from 'types'

const NEXT_POLYSCAL_API_KEY = process.env.NEXT_POLYSCAL_API_KEY!!

export const TransactionItem: React.FC<ITxData> = () => {
  const { address } = useAccount()
  const toast = useToast()

  return <div></div>
}
