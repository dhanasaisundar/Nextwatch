import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import NextWatchContext from './Context/NextWatchContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import VideoItemDetail from './components/VideoItemDetail'
import SavedItems from './components/SavedItems'

import './App.css'

class App extends Component {
  state = {isDark: false, savedItem: []}

  onThemeChange = () => {
    const {isDark} = this.state
    if (isDark === true) {
      this.setState({isDark: false})
    } else {
      this.setState({isDark: true})
    }
  }

  render() {
    const {isDark, savedItem} = this.state
    return (
      <Switch>
        <NextWatchContext.Provider
          value={{isDark, savedItem, onThemeChange: this.onThemeChange}}
        >
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/videos/:id" component={VideoItemDetail} />
          <Route exact path="/saved-videos" component={SavedItems} />
        </NextWatchContext.Provider>
      </Switch>
    )
  }
}

export default App
