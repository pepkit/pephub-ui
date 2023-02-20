import { PageLayout } from '@/components/layout/page-layout'
import { usePephubSearch } from '@/hooks/usePephubSearch'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export default function Search() {
  const router = useRouter()
  const { query } = router.query

  const [searchQuery, setSearchQuery] = useState(query || '')
  const searchQueryDebounced = useDebounce(searchQuery, 500)

  const { data: searchResults, isFetching: isLoadingSearchResults } =
    usePephubSearch(searchQueryDebounced)

  useEffect(() => {
    if (query) setSearchQuery(query)
  }, [query])

  //   useEffect(() => {
  //     if (searchQuery)
  //       router.push(
  //         {
  //           pathname: `/search`,
  //           query: { query: searchQuery },
  //         },
  //         undefined,
  //         { shallow: true } // required to prevent page reload
  //       )
  //   }, [searchQuery, router])

  return (
    <PageLayout title="Search">
      <div className="d-flex flex-row align-items-center mt-3">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control form-control-lg me-1 border border-dark border-2 shadow-sm text-primary"
          placeholder="Search for PEPs"
        />
      </div>
      <div className="mt-3">
        {isLoadingSearchResults ? (
          <div className="d-flex flex-row align-items-center justify-content-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        )}
      </div>
    </PageLayout>
  )
}
