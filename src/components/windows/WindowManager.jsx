import { useWindow } from '../../contexts/WindowContext'
import TabsBar from '../layout/TabsBar'
import CodeDisplay from '../CodeDisplay'
import { bioContent } from '../../content/bio'
import { resumeContent } from '../../content/resume'
import { projectsContent } from '../../content/projects'
import { contactContent } from '../../content/contact'

function WindowManager() {
  const { windows, activeWindow } = useWindow()
  
  const getContent = (id) => {
    switch (id) {
      case 'bio':
        return bioContent
      case 'resume':
        return resumeContent
      case 'projects':
        return projectsContent
      case 'contact':
        return contactContent
      default:
        return '// Empty file'
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      <TabsBar />
      <div className="flex-1 relative">
        {windows.map(window => (
          <div
            key={window.id}
            className={`absolute ${
              window.id === activeWindow ? 'block' : 'hidden'
            }`}
          >
            <CodeDisplay content={getContent(window.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WindowManager