import {Link, withRouter} from 'react-router-dom'

import NextWatchContext from '../../Context/NextWatchContext'
import './index.css'

function GameItem(props) {
  const {eachGame} = props
  const {id} = eachGame
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const gamingTitle = isDark ? 'gaming-title-dark' : 'game-title'
        const gamingViewsText = isDark
          ? 'game-views-text-dark'
          : 'game-views-text'
        return (
          <li className="game-container">
            <Link to={`/videos/${id}`} className="gaming-router-link-style">
              <img
                src={eachGame.thumbnailUrl}
                alt="video"
                className="game-image"
              />
              <h3 className={gamingTitle}>{eachGame.title}</h3>
              <p className={gamingViewsText}>
                {eachGame.viewCount} Watching World Wide
              </p>
            </Link>
          </li>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default withRouter(GameItem)
