import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import './index.css'
import NextWatchContext from '../../Context/NextWatchContext'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import GameItem from '../GameItem'

const apiGamingStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gamingList: [], apiStatus: apiGamingStatusConstants.initial}

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({apiStatus: apiGamingStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      methods: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(gamingApiUrl, options)
    const data = await response.json()
    const gamingData = data.videos
    console.log(gamingData)
    if (response.ok === true) {
      const updatedGamingList = gamingData.map(eachGame => ({
        id: eachGame.id,
        title: eachGame.title,
        thumbnailUrl: eachGame.thumbnail_url,
        viewCount: eachGame.view_count,
      }))
      this.setState({
        gamingList: updatedGamingList,
        apiStatus: apiGamingStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiGamingStatusConstants.failure})
    }
  }

  renderGamingView = () => {
    const {gamingList} = this.state
    console.log(gamingList)
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const gamingHeadingDark = isDark ? 'gaming-heading-dark' : ''
          const gamingBgDark = isDark ? 'gaming-bg-dark ' : ''
          return (
            <div className={`gaming-main-bg ${gamingBgDark}`}>
              <div className={`gaming-heading ${gamingHeadingDark}`}>
                <SiYoutubegaming className="gaming-icon-bg" />
                <h1>Gaming</h1>
              </div>
              <ul className="gaming-list-container">
                {gamingList.map(eachGame => (
                  <GameItem key={eachGame.id} eachGame={eachGame} />
                ))}
              </ul>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  renderGamingLoaderView = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const loaderColor = isDark ? '#ffffff' : '#313131'
        const loaderContainer = isDark
          ? 'loader-container-dark'
          : 'loader-container'
        return (
          <div className={loaderContainer} data-testid="loader">
            <Loader
              type="ThreeDots"
              color={loaderColor}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )

  renderGamingFailureView = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const failureContainer = isDark
          ? 'failure-container-dark'
          : 'failure-container-light'
        const failureBgImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        const oopsText = isDark ? 'oops-text-dark' : 'oops-text-light'
        return (
          <div className={failureContainer}>
            <img
              src={failureBgImage}
              alt="failure view"
              className="failure-image"
            />
            <h1 className={oopsText}>Oops! Something Went Wrong</h1>
            <p className={oopsText}>
              We having some trouble to Complete your request
            </p>
            <p className={oopsText}>Please try again later</p>
            <button
              type="button"
              className="retry-btn "
              onClick={this.handleRetryBtn}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )

  renderGamingResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiGamingStatusConstants.success:
        return this.renderGamingView()
      case apiGamingStatusConstants.inProgress:
        return this.renderGamingLoaderView()
      case apiGamingStatusConstants.failure:
        return this.renderGamingFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="video-details-item-container">
          <LeftNavBar />
          {this.renderGamingResultView()}
        </div>
      </>
    )
  }
}

export default Gaming
