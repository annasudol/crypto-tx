import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { AppConfig } from '@/utils/AppConfig'

export interface MetaProps {
  description?: string
  image?: string
  title: string
  type?: string
}

export const Head = ({
  customMeta,
}: {
  customMeta?: MetaProps
}): JSX.Element => {
  const router = useRouter()
  const meta: MetaProps = {
    title: AppConfig.title,
    description: AppConfig.site_name,
    image: `${router.basePath}/images/site-preview.png`,
    type: 'website',
    ...customMeta,
  }

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${router.basePath}${router.asPath}`} />
      <link rel="canonical" href={`${router.basePath}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Next.js Ethereum Starter" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@huntarosan" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </NextHead>
  )
}
