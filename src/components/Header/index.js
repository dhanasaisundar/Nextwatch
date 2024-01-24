import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMoon} from 'react-icons/io'
import {BsSun} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function Header(props) {
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark, onThemeChange} = value
        const logoImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const logoutBtnTheme = isDark ? 'dark-logout-btn' : 'light-logout-btn'
        const headerMainBg = isDark
          ? 'dark-header-main-bg'
          : 'light-header-main-bg'

        function handleThemeBtn() {
          onThemeChange()
        }

        function logoutBtn() {
          Cookies.remove('jwtToken')
          const {history} = props
          history.replace('/login')
        }

        return (
          <div className={`header-main-bg ${headerMainBg}`}>
            <div className="logo-image-container">
              <img
                src={logoImage}
                alt="website logo"
                className="header-logo-image"
              />
            </div>
            <div className="navbar-icons">
              <button
                type="button"
                className="theme-btn"
                onClick={handleThemeBtn}
                data-testid="theme"
              >
                {isDark ? (
                  <BsSun
                    style={{width: '30px', height: '30px', color: `#fff`}}
                  />
                ) : (
                  <IoMdMoon style={{width: '30px', height: '30px'}} />
                )}
              </button>
              <div className="profile-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-icon"
                />
              </div>

              <button
                type="button"
                className={logoutBtnTheme}
                onClick={logoutBtn}
              >
                Logout
              </button>
            </div>
            <div className="nav-bars">
              <button
                type="button"
                className="theme-btn"
                onClick={handleThemeBtn}
              >
                {isDark ? (
                  <BsSun
                    style={{width: '30px', height: '30px', color: `#fff`}}
                  />
                ) : (
                  <IoMdMoon style={{width: '30px', height: '30px'}} />
                )}
              </button>

              <button type="button" className="theme-btn" data-testid="theme">
                {isDark ? (
                  <GiHamburgerMenu
                    style={{width: '30px', height: '30px', color: '#fff'}}
                  />
                ) : (
                  <GiHamburgerMenu style={{width: '30px', height: '30px'}} />
                )}
              </button>

              <button type="button" className="theme-btn" onClick={logoutBtn}>
                {isDark ? (
                  <FiLogOut
                    style={{width: '30px', height: '30px', color: '#fff'}}
                  />
                ) : (
                  <FiLogOut style={{width: '30px', height: '30px'}} />
                )}
              </button>
            </div>
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default withRouter(Header)
