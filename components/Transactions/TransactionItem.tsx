import { Box, Divider, Heading, Text, useToast } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { ITxData } from 'types'

export const TransactionItem: React.FC<ITxData> = ({ nonce }) => {
  const { address } = useAccount()
  const toast = useToast()

  return <div>{nonce}</div>
}
