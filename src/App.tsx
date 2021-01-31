import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { validateCurrentToken } from 'state/actions/user'
import AppRouter from './AppRouter'

type Props = {
  validateCurrentToken: () => void
}

class App extends Component<Props> {
  componentDidMount() {
    this.props.validateCurrentToken()
  }

  render() {
    return <AppRouter />
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  validateCurrentToken: () => validateCurrentToken(dispatch)
})

export default connect(null, mapDispatchToProps)(App);
