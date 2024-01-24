import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function SavedVideo(props) {
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
        const savedViewsCount = isDark ? 'saved-views-count-dark' : ''
        return (
          <li className="sv-link-container">
            <Link
              to={`/videos/${id}`}
              className={`saved-video-link-style ${savedViewsCount}`}
            >
              <img
                src={eachVideo.thumbnailUrl}
                alt="thumbnailUrl"
                className="saved-video-thumbnail"
              />
              <div>
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

export default SavedVideo
