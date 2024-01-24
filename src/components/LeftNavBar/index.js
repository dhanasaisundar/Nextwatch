import {Link} from 'react-router-dom'
import './index.css'
import {BiListPlus} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import NextWatchContext from '../../Context/NextWatchContext'

function Navbar() {
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const leftNavTheme = isDark ? 'left-nav-dark-bg' : 'left-nav-light-bg'
        const navLeftIcons = isDark ? 'nav-left-icons-dark' : 'nav-left-icons'
        const lefNavIconTextDark = isDark
          ? 'lef-nav-icon-text-dark'
          : 'lef-nav-icon-text'
        const contactUsText = isDark
          ? 'contact-us-text-dark'
          : 'contact-us-text'
        const lefNavIconContainerLight = isDark
          ? 'lef-nav-icon-container-dark'
          : 'lef-nav-icon-container-light'

        return (
          <div className={`left-navbar-main-bg ${leftNavTheme}`}>
            <div className="left-navbar-top-section">
              <div className={lefNavIconContainerLight}>
                <Link to="/" className="router-link-style">
                  <button type="button" className="left-navbar-icon-btn">
                    <AiFillHome className={navLeftIcons} />
                    <h3 className={lefNavIconTextDark}>Home</h3>
                  </button>
                </Link>
              </div>

              <div className={lefNavIconContainerLight}>
                <Link to="trending" className="router-link-style">
                  <button type="button" className="left-navbar-icon-btn">
                    <HiFire className={navLeftIcons} />
                    <h3 className={lefNavIconTextDark}>Trending</h3>
                  </button>
                </Link>
              </div>
              <div className={lefNavIconContainerLight}>
                <Link to="/gaming" className="router-link-style">
                  <button type="button" className="left-navbar-icon-btn">
                    <SiYoutubegaming className={navLeftIcons} />
                    <h3 className={lefNavIconTextDark}>Gaming</h3>
                  </button>
                </Link>
              </div>
              <div className={lefNavIconContainerLight}>
                <Link to="/saved-videos" className="router-link-style">
                  <button type="button" className="left-navbar-icon-btn">
                    <BiListPlus className={navLeftIcons} />
                    <h3 className={lefNavIconTextDark}>Saved Videos</h3>
                  </button>
                </Link>
              </div>
            </div>
            <div className="left-navbar-bottom-section">
              <p className={contactUsText}>CONTACT US</p>
              <div className="contact-icons-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="contact-us-icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="contact-us-icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="contact-us-icon"
                />
              </div>
              <p className={contactUsText}>
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default Navbar
