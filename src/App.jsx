import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { WindowProvider } from './contexts/WindowContext'
import MenuBar from './components/layout/MenuBar'
import ActivityBar from './components/layout/ActivityBar'
import Sidebar from './components/Sidebar'
import WindowManager from './components/windows/WindowManager'
import StatusBar from './components/layout/StatusBar'

function App() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [sidebarView, setSidebarView] = useState('explorer')
  
  return (
    <ThemeProvider>
      <WindowProvider>
        <div className="h-screen flex flex-col bg-[#1e1e1e] text-[#cccccc]">
          <MenuBar 
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          
          <div className="flex-1 flex overflow-hidden">
            <ActivityBar 
              activeView={sidebarView}
              onViewChange={setSidebarView}
            />
            {/* Add Sidebar component here */}
            {sidebarView && <Sidebar view={sidebarView} />}
            <div className="flex-1">
              <WindowManager />
            </div>
          </div>
          
          <StatusBar />
        </div>
      </WindowProvider>
    </ThemeProvider>
  )
}

export default App