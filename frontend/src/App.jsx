import c from './App.module.scss'
import { Outlet } from 'react-router-dom'

import Nav from './components/nav/Nav'

function App() {
  return (
    <div className={c.layout}>
      <Nav /> <Outlet />
    </div>
  )
}
export default App
