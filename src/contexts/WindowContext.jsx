import { createContext, useContext, useState } from 'react'

const WindowContext = createContext()

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([])
  const [activeWindow, setActiveWindow] = useState(null)

  const createWindow = (window) => {
    const newWindow = {
      ...window,
      id: window.id || Date.now(),
      pinned: false,
      zIndex: windows.length
    }
    setWindows(prevWindows => {
      const lastPinnedIndex = [...prevWindows].reverse()
        .findIndex(w => w.pinned)
      const insertIndex = lastPinnedIndex === -1 ? 0 : prevWindows.length - lastPinnedIndex
      
      const newWindows = [...prevWindows]
      newWindows.splice(insertIndex, 0, newWindow)
      return newWindows
    })
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

  const pinWindow = (id) => {
    setWindows(prevWindows => {
      const windowIndex = prevWindows.findIndex(w => w.id === id)
      const window = prevWindows[windowIndex]
      const newWindows = prevWindows.filter(w => w.id !== id)
      
      if (window.pinned) {
        const firstUnpinnedIndex = newWindows.findIndex(w => !w.pinned)
        newWindows.splice(firstUnpinnedIndex, 0, { ...window, pinned: false })
      } else {
        const lastPinnedIndex = [...newWindows].reverse()
          .findIndex(w => w.pinned)
        const insertIndex = lastPinnedIndex === -1 ? 0 : newWindows.length - lastPinnedIndex
        newWindows.splice(insertIndex, 0, { ...window, pinned: true })
      }
      
      return newWindows
    })
  }

  const focusWindow = (id) => {
    setActiveWindow(id)
  }

  const closeAllWindows = () => {
    setWindows([])
    setActiveWindow(null)
  }

  const closeOtherWindows = (id) => {
    const window = windows.find(w => w.id === id)
    setWindows([window])
    setActiveWindow(id)
  }

  const closeWindowsToRight = (id) => {
    const index = windows.findIndex(w => w.id === id)
    setWindows(windows.slice(0, index + 1))
  }

  const closeWindowsToLeft = (id) => {
    const index = windows.findIndex(w => w.id === id)
    setWindows(windows.slice(index))
  }

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindow,
      createWindow,
      closeWindow,
      pinWindow,
      focusWindow,
      closeAllWindows,
      closeOtherWindows,
      closeWindowsToRight,
      closeWindowsToLeft,
      getWindowPosition: (id) => {
        const index = windows.findIndex(w => w.id === id)
        return {
          hasLeft: index > 0,
          hasRight: index < windows.length - 1,
          isOnly: windows.length === 1
        }
      }
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