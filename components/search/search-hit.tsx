import { FC } from 'react'

type Props<T> = {
  [P in keyof T]?: T[P]
}

export const SearchHit: FC<Props<ProjectSearchHit>> = ({ payload }) => {
  return (
    <div className="border-top border-dark py-1">
      <p className="text-primary fw-bold h5">
        <i className="bi bi-table me-2 text-secondary"></i>
        {payload?.registry}
      </p>
      <p className="text-secondary text-truncate">{payload?.description}</p>
    </div>
  )
}
