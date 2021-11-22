import React, {Suspense, useEffect} from 'react'
import { UseLazyComponent as useLazyComponent } from '../../package/useLazyComponents'
import { HeaderSkeleton } from '../HeaderSkeleton/header-skeleton'

export const Header = () => {
  const ReduxHeader = useLazyComponent(
    () => import('../../gamma/src/components/header/header')
  )

  return <div>
    <Suspense fallback={<HeaderSkeleton />}>
      <ReduxHeader />
    </Suspense>
  </div>
}