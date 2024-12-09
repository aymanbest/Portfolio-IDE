// src/contexts/WindowContext.jsx
import { createContext, useContext, useState } from 'react'

const WindowContext = createContext()

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([])
  const [activeWindow, setActiveWindow] = useState(null)

  const createWindow = (window) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.id === window.id)
    
    if (existingWindow) {
      // Focus existing window instead of creating new one
      setActiveWindow(existingWindow.id)
      return
    }

    // Create new window if it doesn't exist
    const newWindow = {
      ...window,
      id: window.id || Date.now(),
      zIndex: windows.length,
      minimized: false,
      maximized: false
    }

    setWindows([...windows, newWindow])
    setActiveWindow(newWindow.id)
  }

  const closeWindow = (id) => {
    setWindows(prevWindows => {
      const filteredWindows = prevWindows.filter(w => w.id !== id)
      if (activeWindow === id && filteredWindows.length > 0) {
        setActiveWindow(filteredWindows[filteredWindows.length - 1].id)
      } else if (filteredWindows.length === 0) {
        setActiveWindow(null)
      }
      return filteredWindows
    })
  }

  const focusWindow = (id) => {
    setActiveWindow(id)
  }

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindow,
      createWindow,
      closeWindow,
      focusWindow
    }}>
      {children}
    </WindowContext.Provider>
  )
}

export function useWindow() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider')
  }
  return context
}