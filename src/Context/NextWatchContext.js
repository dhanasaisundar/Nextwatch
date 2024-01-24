import React from 'react'

const NextWatchContext = React.createContext({
  isDark: false,
  savedItem: [],
  onThemeChange: () => {},
})

export default NextWatchContext
