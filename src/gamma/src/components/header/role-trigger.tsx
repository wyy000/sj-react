import React from 'react'
import { MemberModel } from '../../types/models'

interface Props {
  me: MemberModel | undefined
  isLoggedIn: boolean
}

export const RoleTrigger: React.FC<Props> = (props: Props) => {
  const { me } = props

  return <>
    <div onClick={() => console.log(1)}>{me?.name}</div>
  </>
}
