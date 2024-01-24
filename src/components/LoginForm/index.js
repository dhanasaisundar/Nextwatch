import {useState} from 'react'
import Cookies from 'js-cookie'
import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(true)
  const [type, setType] = useState('password')

  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const mainBackgroundColor = isDark ? 'dark-bg-login-main-bg' : ''
        const loginBgColor = isDark ? 'dark-bg-login-container' : ''
        const logoImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        function handleShowPassword() {
          if (type === 'password') {
            setType('text')
          } else {
            setType('password')
          }
        }

        function onSubmitSuccess(jwtToken) {
          const {history} = props
          Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
          history.replace('/')
        }

        function onSubmitFailure(errorMsg) {
          setIsLoginSuccessful(false)
          setError(errorMsg)
        }

        function handleUsername(event) {
          setUsername(event.target.value)
        }

        function handlePassword(event) {
          setPassword(event.target.value)
        }

        async function handleFormSubmit(event) {
          event.preventDefault()
          const loginApiUrl = 'https://apis.ccbp.in/login'
          const userDetails = {username, password}
          const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
          }
          const response = await fetch(loginApiUrl, options)
          const data = await response.json()
          console.log(data)
          if (response.ok === true) {
            onSubmitSuccess(data.jwt_token)
          } else {
            onSubmitFailure(data.error_msg)
          }
        }

        function renderLoginForm() {
          return (
            <div className={`login-main-bg ${mainBackgroundColor}`}>
              <form
                className={`login-container ${loginBgColor}`}
                onSubmit={handleFormSubmit}
              >
                <img
                  src={logoImage}
                  alt="website logo"
                  className="website-logo"
                />
                <label htmlFor="username" className="login-label-element">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  className="login-input-element"
                  onChange={handleUsername}
                />
                <label htmlFor="password" className="login-label-element">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type={`${type}`}
                  placeholder="password"
                  className="login-input-element"
                  onChange={handlePassword}
                />
                <div className="show-password-container">
                  <input
                    type="checkbox"
                    id="show password"
                    onClick={handleShowPassword}
                  />
                  <label htmlFor="show password" className="show-pass-label">
                    Show Password
                  </label>
                </div>
                <button type="submit" className="log-in-button">
                  Login
                </button>
                {isLoginSuccessful ? '' : <p className="error-msg">*{error}</p>}
              </form>
            </div>
          )
        }

        return <>{renderLoginForm()}</>
      }}
    </NextWatchContext.Consumer>
  )
}

export default LoginForm
