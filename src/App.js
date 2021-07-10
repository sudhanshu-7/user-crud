import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router  ,Switch , Redirect , Route} from 'react-router-dom'
import UserList from './components/UserList'
import NewUser from './components/NewUser'
export default function App() {
  return (
    <>
    <Router>
    <Header />
    <Switch>
    <Route path="/" exact>
      <UserList/>
    </Route>
    <Route path="/new">
      <NewUser/>
    </Route>
    <Redirect to ="/"/>
    </Switch>
    </Router>
    </>
  )
}
