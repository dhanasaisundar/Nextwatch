import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function VideoItem(props) {
  const {videoItem} = props
  const publishedDateInWords = formatDistanceToNow(
    new Date(videoItem.publishedAt),
  )
  const publishArray = publishedDateInWords.split(' ')
  const reOrganisedArray = publishArray.slice(1, 2)
  const publishedYear = reOrganisedArray.join('')
  console.log(formatDistanceToNow(new Date(videoItem.publishedAt)))
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const textDescriptionDark = isDark
          ? 'text-description-dark'
          : 'text-description'
        const titleTextDark = isDark ? 'title-text-dark' : 'title-text'
        const videoId = videoItem.id
        return (
          <li className="video-item-container">
            <Link to={`/videos/${videoId}`} className="video-link-style">
              <img
                src={videoItem.thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-image"
              />
              <div className="video-description">
                <img
                  src={videoItem.channel.profile_image_url}
                  alt="profile"
                  className="channel-profile-image"
                />
                <div className="video-details">
                  <p className={titleTextDark}>{videoItem.title}</p>
                  <p className={textDescriptionDark}>
                    {videoItem.channel.name}
                  </p>
                  <div className="video-view-details">
                    <p className={textDescriptionDark}>
                      {videoItem.viewCount} views
                    </p>
                    <p className={textDescriptionDark}>
                      {publishedYear} years ago
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default VideoItem
