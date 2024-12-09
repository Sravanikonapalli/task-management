import {Route, BrowserRouter, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
