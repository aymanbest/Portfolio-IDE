import { useTheme } from '../../contexts/ThemeContext'

function StatusBar() {
  const { theme } = useTheme()
  
  return (
    <div 
      className="h-6 flex items-center justify-between px-4 text-sm" 
      style={{ backgroundColor: theme.colors.statusBar }}
    >
      <div className="flex items-center gap-3">
        <span>🌟 Ready</span>
        <span>UTF-8</span>
        <span>JavaScript React</span>
      </div>
      
      <div className="flex items-center gap-3">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>{theme.type}</span>
      </div>
    </div>
  )
}

export default StatusBar