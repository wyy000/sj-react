import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RoleTrigger } from './role-trigger'

const Header:React.FC = () => {
  const preload = {
    me: {
      name: '😊',
      id: 'myID',
    },
    isLoggedIn: true,
  }

  let [meState, setMeState] = useState({
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
        { meState.isLoggedIn
          ? <RoleTrigger {...meState} />
          : <button className="text-white" onClick={() => setMeState(() => ({...preload}))}>登录</button>
        }
      </header>
    </>
  )
}

export default Header