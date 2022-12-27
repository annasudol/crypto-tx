import { Box, Divider, useToast, Text, Link } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { ITxData } from 'types'

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
    <Box mb="2" bg="gray.100" rounded={'md'} padding="2" className="tx-item">
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
