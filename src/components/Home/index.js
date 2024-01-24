import {Component} from 'react'
import Header from '../Header'
import LeftNavbar from '../LeftNavBar'
import Videos from '../Videos'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="main-body-container">
          <LeftNavbar />
          <Videos />
        </div>
      </>
    )
  }
}

export default Home
