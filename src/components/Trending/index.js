import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import './index.css'
import NextWatchContext from '../../Context/NextWatchContext'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import TrendingItem from '../TrendingItem'

const apiTrendingStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingList: [], apiStatus: apiTrendingStatusConstants}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({apiStatus: apiTrendingStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      methods: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingApiUrl, options)
    const data = await response.json()
    const trendingData = data.videos
    console.log(trendingData)
    if (response.ok === true) {
      const updatedTrendingList = trendingData.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        channel: eachVideo.channel,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        trendingList: updatedTrendingList,
        apiStatus: apiTrendingStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiTrendingStatusConstants.failure})
    }
  }

  renderTrendingVideos = () => {
    const {trendingList} = this.state
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const trendingHeading = isDark ? 'trending-heading-dark' : ''
          const trendingMainBg = isDark ? 'trending-main-bg-dark' : ''
          return (
            <div className={`trending-main-bg ${trendingMainBg}`}>
              <div className={`gaming-heading ${trendingHeading}`}>
                <HiFire className="gaming-icon-bg" />
                <h1>Trending</h1>
              </div>
              <ul className="trending-list-container">
                {trendingList.map(eachVideo => (
                  <TrendingItem key={eachVideo.id} eachVideo={eachVideo} />
                ))}
              </ul>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  renderTrendingLoaderView = () => (
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

  renderTrendingFailureView = () => (
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

  renderTrendingResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiTrendingStatusConstants.success:
        return this.renderTrendingVideos()
      case apiTrendingStatusConstants.inProgress:
        return this.renderTrendingLoaderView()
      case apiTrendingStatusConstants.failure:
        return this.renderTrendingFailureView()
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
          {this.renderTrendingResultView()}
        </div>
      </>
    )
  }
}

export default Trending
