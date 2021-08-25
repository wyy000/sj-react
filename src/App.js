import {NavLink, Switch, Route} from 'react-router-dom'

import Trigger from './page/trigger/index'
import Admin from './page/admin/index'
import Home from './page/Home'

// import './App.css'
import LayoutMessage from './components/layout/layout-message'

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="h-10 bg-coolGray-800 flex items-center">
        <h1 className="text-white">header</h1>
      </header>

      <nav className="m-2 flex justify-center space-x-1 text-sm">
        <NavLink to="/trigger" className="p-0.5 px-2 border border-white rounded-full" activeClassName="border-grayGreen text-grayGreen">trigger</NavLink>
        <NavLink to="/admin" className="p-0.5 px-2 border border-white rounded-full" activeClassName="border-grayGreen text-grayGreen">admin</NavLink>
      </nav>

      <div className="flex-1">
        <Switch>
          <Route path="/trigger" component={(props) => <Trigger {...props} />} />
          <Route path="/admin" component={(props) => <Admin {...props} />}/>
          <Route path="/" component={(props) => <Home {...props} />}/>
        </Switch>
      </div>

      <footer>
        <div className="text-center">-- @yang --</div>
      </footer>

      <LayoutMessage />
    </div>
  )
}

export default App
