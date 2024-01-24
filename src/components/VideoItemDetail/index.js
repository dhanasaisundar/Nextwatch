import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import './index.css'
import NextWatchContext from '../../Context/NextWatchContext'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'

const apiVideoItemStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetail extends Component {
  state = {
    apiStatus: apiVideoItemStatusConstants.initial,
    videoDetail: {},
    likeBtn: false,
    savedBtn: false,
    disLikeBtn: false,
  }

  componentDidMount() {
    this.getVideoItemDetail()
  }

  handleOnClickLike = () => {
    this.setState(prevState => ({
      likeBtn: !prevState.likeBtn,
      disLikeBtn: false,
    }))
  }

  handleOnClickSaveColor = () => {
    this.setState(prevState => ({savedBtn: !prevState.savedBtn}))
  }

  handleOnClickDislike = () => {
    this.setState(prevState => ({
      disLikeBtn: !prevState.disLikeBtn,
      likeBtn: false,
    }))
  }

  getVideoItemDetail = async () => {
    this.setState({apiStatus: apiVideoItemStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const videoItemApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(videoItemApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedVideoDetail = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: data.video_details.channel,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        videoDetail: updatedVideoDetail,
        apiStatus: apiVideoItemStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiVideoItemStatusConstants.failure,
      })
    }
  }

  renderVideoItemDetail = () => {
    const {videoDetail, likeBtn, savedBtn, disLikeBtn} = this.state
    const publishDate = formatDistanceToNow(new Date(videoDetail.publishedAt))
    const publishDateArray = publishDate.split(' ')
    const ReOrgpublishDateArray = publishDateArray.slice(1, 2)
    const publishYearDate = ReOrgpublishDateArray.join('')
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDark, savedItem} = value
          console.log(isDark)
          const videoDetailContainerDark = isDark
            ? 'video-detail-container-dark'
            : ''
          const likeBtnColor = likeBtn ? 'like-btn' : ''
          const saveBtnColor = savedBtn ? 'like-btn' : ''
          const dislikeBtnColor = disLikeBtn ? 'like-btn' : ''

          function handleOnClickSave() {
            let memberShip = false
            for (let i = 0; i < savedItem.length; i += 1) {
              if (savedItem[i].id === videoDetail.id) {
                memberShip = true
                savedItem.pop(savedItem[i])
              }
            }
            if (memberShip === false) {
              savedItem.push(videoDetail)
            }
          }

          return (
            <div
              className={`video-detail-container ${videoDetailContainerDark}`}
            >
              <div className="player-container">
                <ReactPlayer
                  width="100%"
                  height="500px"
                  url={videoDetail.videoUrl}
                  light={videoDetail.thumbNailUrl}
                />
              </div>

              <h2>{videoDetail.title}</h2>
              <div className="views-likes-detail">
                <div className="like-container">
                  <p className="vdi-view-container">
                    {videoDetail.viewCount} views
                  </p>
                  <p>{publishYearDate} years ago</p>
                </div>
                <div className="like-container">
                  <div className="like-container">
                    {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="likes-button"
                      onClick={this.handleOnClickLike}
                    >
                      <BiLike className={likeBtnColor} />
                    </button>
                    <p>Like</p>
                  </div>
                  <div className="like-container">
                    {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="likes-button"
                      onClick={this.handleOnClickDislike}
                    >
                      <BiDislike className={dislikeBtnColor} />
                    </button>
                    <p>Dislike</p>
                  </div>
                  <div className="like-container">
                    {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="likes-button"
                      onClick={() => {
                        handleOnClickSave()
                        this.handleOnClickSaveColor()
                      }}
                    >
                      <BiListPlus className={saveBtnColor} />
                    </button>
                    <p>Save</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="like-container">
                <img
                  src={videoDetail.channel.profile_image_url}
                  alt="profile imageUrl"
                  className="vdi-channel-logo"
                />
                <div>
                  <p className="vdi-channel-name">{videoDetail.channel.name}</p>
                  <p className="vdi-channel-subs ">
                    {videoDetail.channel.subscriber_count} Subscribers
                  </p>
                </div>
              </div>
              <p>{videoDetail.description}</p>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  renderVideoItemLoaderView = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const loaderColor = isDark ? '#ffffff' : '#313131'
        const loaderBg = isDark ? '#2e2d2d' : '#ffffff'
        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={loaderColor}
              backgroundColor={loaderBg}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )

  renderVideoItemFailureView = () => (
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

  renderVideoItemResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiVideoItemStatusConstants.success:
        return this.renderVideoItemDetail()
      case apiVideoItemStatusConstants.inProgress:
        return this.renderVideoItemLoaderView()
      case apiVideoItemStatusConstants.failure:
        return this.renderVideoItemFailureView()
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
          {this.renderVideoItemResultView()}
        </div>
      </>
    )
  }
}

export default VideoItemDetail
