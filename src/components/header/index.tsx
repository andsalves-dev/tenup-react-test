import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Link } from 'react-router-dom'
import { doLogout } from 'state/actions/user'

type StateProps = {
  user: BaseUser | null,
  doLogout: () => void
}

class Header extends PureComponent<StateProps> {
  render() {
    const { doLogout, user } = this.props

    return (
      <header className="site-header" role="banner" itemScope itemType="http://schema.org/WPHeader">
        <h1 className="site-title" itemScope itemType="http://schema.org/Organization">
          10up Blog
        </h1>

        <nav
          className="site-navigation"
          role="navigation"
          itemScope
          itemType="http://schema.org/SiteNavigationElement"
        >
          <a href="#menu-main-nav" id="js-menu-toggle" className="site-menu-toggle">
            <span className="screen-reader-text">Primary Menu</span>
            <span aria-hidden="true">☰</span>
          </a>

          <ul id="menu-main-nav" className="primary-menu">
            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1912">
              <Link to="/">Home</Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
              <Link to="/about">About</Link>
            </li>

            <li className="logged-out menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
              {user ? <a href="#" onClick={doLogout}>Logout</a> : <Link to="/login">Login</Link>}
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.userState.user
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  doLogout: () => doLogout(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
