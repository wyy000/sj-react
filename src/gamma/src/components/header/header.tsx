import React, { useEffect, useRef, useState } from 'react'
import { RoleTrigger } from './role-trigger'

const Header = () => {
  const preload = {
    me: {
      name: '😊',
      id: 'myID',
    },
    isLoggedIn: true,
  }

  let [meState, useMeState] = useState({
    me: {
      name: '',
      id: '',
    },
    isLoggedIn: false,
  })

  return (
    <>
      <header className="h-10 px-16 bg-coolGray-800 flex items-center space-between">
        <h1 className="text-white text-sm flex-1">A small practice project. </h1>
        <RoleTrigger {...preload} />
        {/*<div onClick={() => useMeState(() => ({...preload}))}>登录</div>*/}
      </header>
    </>
  )
}

export default Header