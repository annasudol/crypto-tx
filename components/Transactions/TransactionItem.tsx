import { Box, Divider, Heading, Text, useToast } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { ITxData } from 'types'

export const TransactionItem: React.FC<ITxData> = () => {
  const { address } = useAccount()
  const toast = useToast()

  return <div></div>
}
