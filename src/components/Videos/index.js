import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

// import HomePopup from '../Popup'
import NextWatchContext from '../../Context/NextWatchContext'
import VideoItem from '../VideoItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Videos extends Component {
  state = {
    videoList: [],
    apiStatus: apiStatusConstants.initial,
    videoSearch: '',
    isCloseBtnClicked: false,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {videoSearch} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const videoListApiUrl = `https://apis.ccbp.in/videos/all?search=${videoSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoListApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedVideoList = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        channel: eachVideo.channel,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videoList: updatedVideoList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleRetryBtn = () => {
    this.getVideosList()
  }

  onSearchVideos = event => {
    this.setState({videoSearch: event.target.value})
  }

  handleSearchBtn = () => {
    this.getVideosList()
  }

  renderLoaderView = () => (
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

  renderFailureView = () => (
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

  renderVideoEmptyList = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const noSearchBg = isDark ? 'empty-list-dark' : 'empty-list-light'
        const noSearchText = isDark
          ? 'no-search-text-dark'
          : 'no-search-text-light'
        return (
          <div className={noSearchBg}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="no-search-image"
            />
            <h1 className={noSearchText}>No Search results found</h1>
            <p className={noSearchText}>
              Try different key words or remove search filter
            </p>
            <button type="button" className="retry-btn">
              Retry
            </button>
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )

  renderVideosList = () => {
    const {videoList, isCloseBtnClicked} = this.state
    const handleBannerCloseBtn = () => {
      this.setState({isCloseBtnClicked: true})
    }
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const videoBodyContainer = isDark ? 'video-body-container-dark' : ''
          const videoContainer = isDark
            ? 'videos-container-dark'
            : 'videos-container'
          return (
            <div className={`video-body-container ${videoBodyContainer}`}>
              {isCloseBtnClicked ? (
                ''
              ) : (
                <div className="banner-section">
                  <div className="banner-description">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                      className="banner-website-logo"
                    />
                    <p className="banner-text">
                      But Next Watch Premium prepaid plan with <br />
                      UPI
                    </p>
                    <button type="button" className="banner-get-it-now-btn">
                      GET IT NOW
                    </button>
                  </div>
                  <div>
                    {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="banner-close-btn"
                      onClick={handleBannerCloseBtn}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              )}

              <div className={videoContainer}>
                {/* <HomePopup /> */}
                <div className="search-container">
                  <input
                    type="search"
                    id="video-search"
                    placeholder="Search"
                    className="search-input-element"
                    onChange={this.onSearchVideos}
                  />
                  {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="search-btn"
                    data-testid="searchButton"
                    onClick={this.handleSearchBtn}
                  >
                    <AiOutlineSearch className="search-icon" />
                  </button>
                </div>
                {videoList.length > 0 ? (
                  <ul className="video-list-container">
                    {videoList.map(eachVideo => (
                      <VideoItem key={eachVideo.id} videoItem={eachVideo} />
                    ))}
                  </ul>
                ) : (
                  this.renderVideoEmptyList()
                )}
              </div>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderResultView()}</>
  }
}

export default Videos
