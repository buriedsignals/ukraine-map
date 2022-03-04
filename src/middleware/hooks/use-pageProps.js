import { useContext, createContext } from 'react'

export const PagePropsContext = createContext()

/**
 * useSiteContext
 */

export function usePagePropsContext(data) {
  return {
    data,
  }
}

/**
 * useSite
 */

export default function usePageProps() {
  const pageProps = useContext(PagePropsContext)
  return pageProps
}
