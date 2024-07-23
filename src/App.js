import { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm/index'
import Home from './components/Home'
import VideoDetailView from './components/VideoDetailView'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import ThemeAndVideoContext from './context/ThemeAndVideoContext'

import './App.css'

// Replace your code here

class App extends Component {
  state = {
    savedVideos: [],
    isDarkTheme: false,
    activeTab: 'Home',
  }

  changeTab = tab => {
    this.setState({ activeTab: tab })
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addVideo = video => {
    const { savedVideos } = this.state
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) {
      this.setState({ savedVideos: [...savedVideos, video] })
    } else {
      savedVideos.splice(index, 1)
      this.setState({ savedVideos })
    }
  }

  removeVideo = id => {
    const { savedVideos } = this.state
    const updatedSavedVideos = savedVideos.filter(
      eachVideo => eachVideo.id !== id,
    )
    this.setState({ savedVideos: updatedSavedVideos })
  }

  render() {
    const { savedVideos, isDarkTheme, activeTab } = this.state
    // console.log(savedVideos)
    return (
      <ThemeAndVideoContext.Provider
        value={{
          savedVideos,
          isDarkTheme,
          activeTab,
          toggleTheme: this.toggleTheme,
          addVideo: this.addVideo,
          changeTab: this.changeTab,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/videos/:id" element={<ProtectedRoute element={<VideoDetailView />} />} />
          <Route path="/trending" element={<ProtectedRoute element={<TrendingVideos />} />} />
          <Route path="/gaming" element={<ProtectedRoute element={<GamingVideos />} />} />
          <Route path="/saved-videos" element={<ProtectedRoute element={<SavedVideos />} />} />
          <Route path="Not-Found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/Not-Found" />} />
        </Routes>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
