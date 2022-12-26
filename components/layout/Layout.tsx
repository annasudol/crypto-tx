import { Container, Flex, SimpleGrid, Text } from '@chakra-ui/react'
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
        <Container maxWidth="container.xl" centerContent mt="8" py="8">
          <ConnectButton />
        </Container>
      </header>
      <main>
        <Container maxWidth="container.xl" centerContent>
          {children}
        </Container>
      </main>
      <footer>
        <Container
          mt="8"
          py="8"
          maxWidth="container.xl"
          centerContent
          style={{ position: 'fixed', bottom: 0 }}
        >
          <Text mb="4">
            © Copyright {new Date().getFullYear()} {AppConfig.title}
          </Text>
        </Container>
      </footer>
    </>
  )
}
