import { useContext } from 'react'
import { useRouter } from 'next/router'

import { SiteContext } from '@/middleware/hooks/use-site'

import { constructPageMetadata } from '@/middleware/lib/site'

export default function usePageMetadata({ metadata: pageMetadata }) {
  const { homepage, metadata: defaultMetadata } = useContext(SiteContext)

  const router = useRouter()

  const metadata = constructPageMetadata(defaultMetadata, pageMetadata, {
    homepage,
    router,
  })

  return {
    metadata,
  }
}
