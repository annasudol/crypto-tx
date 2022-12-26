import { Box, Divider, useToast, Text, Link } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { ITxData } from 'types'
// from: string
// functionName: string
// gas: string
// gasPrice: string
// gasUsed: string
// hash: string
// input: string
// isError: string
// methodId: string
// nonce: string
// timeStamp: string
// to: string
// transactionIndex: string
// txreceipt_status: string
// value: string
export const TransactionItem: React.FC<ITxData> = ({
  hash,
  timeStamp,
  from,
  to,
  gasUsed,
  blockNumber,
  nonce,
}) => {
  return (
    <Box mb="2" bg="gray.100" rounded={'md'} padding="2">
      <Text fontSize="sm" mb="1">
        <b>Hash</b>: {hash}
      </Text>
      <Text fontSize="sm" mb="1">
        <b>Date</b>: {new Date(Number(timeStamp) * 1000).toDateString()}
      </Text>
      <Text fontSize="sm" mb="1">
        <b>From</b>: {from}
      </Text>
      {to && (
        <Text fontSize="sm" mb="1">
          <b>To</b>: {to}
        </Text>
      )}
      <Text fontSize="sm" mb="1">
        <b>Used Gas</b>: {gasUsed}
      </Text>
      <Text fontSize="sm" mb="1">
        <b>Block Number</b>: {blockNumber}
      </Text>
      <Text fontSize="sm" mb="1">
        <b>Nonce</b>: {nonce}
      </Text>
      <Link href={`https://mumbai.polygonscan.com/tx/${hash}`} isExternal>
        View on Etherscan
      </Link>
    </Box>
  )
}
