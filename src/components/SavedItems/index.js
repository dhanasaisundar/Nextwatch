import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'

import './index.css'
import NextWatchContext from '../../Context/NextWatchContext'
import SavedVideo from '../SavedVideo'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'

class SavedItems extends Component {
  noSavedVideos = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const noSavedVideoBg = isDark
          ? 'no-saved-video-bg-dark'
          : 'no-saved-video-bg'
        return (
          <div className={noSavedVideoBg}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="no-saved-video-img"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </div>
        )
      }}
    </NextWatchContext.Consumer>
  )

  getSavedItems = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark, savedItem} = value
        const svHeadingDark = isDark ? 'sv-heading-dark' : ''
        const svBgDark = isDark ? 'sv-bg-dark ' : ''
        const lenOfSavedVideos = savedItem.length
        if (lenOfSavedVideos > 0) {
          return (
            <div className={`sv-main-bg ${svBgDark}`}>
              <div className={`sv-heading ${svHeadingDark}`}>
                <BiListPlus className="sv-icon-bg" />
                <h1>Saved Videos</h1>
              </div>
              <ul className="sv-list-container">
                {savedItem.map(eachVideo => (
                  <SavedVideo key={eachVideo.id} eachVideo={eachVideo} />
                ))}
              </ul>
            </div>
          )
        }
        return this.noSavedVideos()
      }}
    </NextWatchContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="video-details-item-container">
          <LeftNavBar />
          {this.getSavedItems()}
        </div>
      </>
    )
  }
}

export default SavedItems
