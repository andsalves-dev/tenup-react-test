import React, { ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import Page from 'components/page'
import { Dispatch } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { requestToken } from 'state/actions/user'

type StateProps = {
  hasError: boolean
  isLoading: boolean
  requestToken: (login: LoginData) => Promise<void>
}

type Props = StateProps & RouteComponentProps
type State = LoginData

class Login extends React.PureComponent<Props, State> {
  state = {
    username: '',
    password: '',
  }

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    this.setState(state => ({
      username: id === 'username' ? value : state.username,
      password: id === 'password' ? value : state.password,
    }))
  }

  submit = (event: FormEvent) => {
    event.preventDefault()
    const { history, requestToken } = this.props
    const { username, password } = this.state

    if (!username || !password) {
      alert('Please provide username and password!')
      return
    }

    requestToken({ username, password }).then(() => {
      if (!this.props.hasError) {
        alert('Logged in successfully!')
        history.push('/')
      }
    })
  }

  render() {
    return (
      <Page title="10up Blog - Login">
        <h1>Login</h1>

        {this.renderContent()}
      </Page>
    )
  }

  renderContent = () => {
    const { hasError, isLoading } = this.props

    return (
      <div className="login">
        <form onSubmit={this.submit}>
          <div>
            <label htmlFor="username">Username</label>&nbsp;
            <input id="username" type="text" data-qa="usernameInput" onChange={this.onInputChange} disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="password">Password</label>&nbsp;
            <input id="password" type="password" data-qa="passwordInput" onChange={this.onInputChange} disabled={isLoading} />
          </div>
          <div>
            <input type="submit" value="Submit" name="submit" disabled={isLoading} /><br />
            {isLoading && (
              <span>Logging in...</span>
            )}
            {hasError ? <small>Error logging in. Check your credentials</small> : ''}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.userState.fetchState === 'LOADING',
  hasError: Boolean(state.userState.error),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestToken: (login: LoginData) => requestToken(dispatch, login)
})

export const bareClass = Login
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
