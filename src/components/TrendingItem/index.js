import {formatDistanceToNow} from 'date-fns'
import {Link, withRouter} from 'react-router-dom'

import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function TrendingItem(props) {
  const {eachVideo} = props
  const {id} = eachVideo
  const trendingPublishedDateInWords = formatDistanceToNow(
    new Date(eachVideo.publishedAt),
  )
  const trendingPublishArray = trendingPublishedDateInWords.split(' ')
  const reOrganizedArray = trendingPublishArray.slice(1, 2)
  const trendingPublishedYear = reOrganizedArray.join('')
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const trendingVideoLinkStyleDark = isDark
          ? 'trending-video-link-style-dark'
          : ''
        return (
          <li className="trending-item-container ">
            <Link
              to={`/videos/${id}`}
              className={`trending-video-link-style ${trendingVideoLinkStyleDark}`}
            >
              <img
                src={eachVideo.thumbnailUrl}
                alt="thumbnailUrl"
                className="trending-thumbnail"
              />
              <div className="trending-description-container">
                <h2>{eachVideo.title}</h2>
                <p>{eachVideo.channel.name}</p>
                <div className="trending-views-publish">
                  <p className="trending-view-count">
                    {eachVideo.viewCount} Views
                  </p>
                  <p>. {trendingPublishedYear} years ago</p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default withRouter(TrendingItem)
