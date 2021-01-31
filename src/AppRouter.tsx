import React, { lazy, Component, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

const Home = lazy(() => import('pages/home'))
const About = lazy(() => import('pages/about'))
const Login = lazy(() => import('pages/login'))
const NotFound = lazy(() => import('pages/not-found'))

class AppRouter extends Component {
  render() {
    return (
      <Suspense fallback={'Loading....'}>
        <Router>
          <Switch>
            <Route path="/" exact>
              {<Home />}
            </Route>
            <Route path="/about" exact>
              {<About />}
            </Route>
            <Route path="/login" exact>
              {<Login />}
            </Route>
            <Route path="/*">
              {<NotFound />}
            </Route>
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default AppRouter;
