import {useState} from 'react'

const theme = {
  default: 'grayGreen',
  warn: 'yellow',
  error: 'red',
  success: 'blue',
}

function LayoutMessage () {
  const [message, setMessage] = useState([['message', 'default']])
  // setMessage(prevState => {
  //   return {...prevState, ...updatedValues}
  // })

  return (
    <div className="absolute w-full bottom-0 isolate flex flex-col">
      {message.map(it => <div key={it[0]} className={`relative text-${theme[it[1]]} border-${theme[it[1]]} mx-auto w-2/5 py-2 bg-white border text-sm text-center`}>
        <span>{it[0]}</span>
        <span className="absolute r-4">X</span>
      </div>)}
    </div>
  )
}

export default LayoutMessage