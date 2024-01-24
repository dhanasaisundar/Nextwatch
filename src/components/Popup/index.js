import {useState} from 'react'
import Popup from 'reactjs-popup'

function HomePopup() {
  const [open] = useState(true)
  return (
    <Popup open={open} modal closeOnDocumentClick={false} closeOnEscape={false}>
      <div className="modal">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="popup-website-logo"
        />
      </div>
    </Popup>
  )
}

export default HomePopup
