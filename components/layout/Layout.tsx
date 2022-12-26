import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
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
        <Container maxWidth="container.xl" mt="8" py="8">
          <Flex alignItems={'center'} justifyContent={'flex-end'}>
            <ConnectButton />
          </Flex>
        </Container>
      </header>
      <main>
        <Container maxWidth="container.xl">{children}</Container>
      </main>
      <footer>
        <Container
          maxW="2xl"
          centerContent
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Text mb="4">
            © Copyright {new Date().getFullYear()} {AppConfig.title}
          </Text>
        </Container>
      </footer>
    </>
  )
}
