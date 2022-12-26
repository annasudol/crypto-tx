import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { WalletConnect } from '../WalletConnect'

import { Head, MetaProps } from './Head'
import { AppConfig } from '@/utils/AppConfig'

interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Container maxWidth="container.md" mt="1" py="4">
          <Flex alignItems="center" justifyContent="flex-end">
            <ConnectButton />
          </Flex>
        </Container>
      </header>
      <main>
        <Container maxWidth="container.md" pb={12}>
          {children}
        </Container>
      </main>
      <footer>
        <Box
          bg="white"
          width="full"
          mt="20"
          textAlign="center"
          position="fixed"
          bottom="0"
          right="0"
          left="0"
        >
          <Text mb="4">
            © Copyright {AppConfig.site_name} {new Date().getFullYear()}
          </Text>
        </Box>
      </footer>
    </>
  )
}
