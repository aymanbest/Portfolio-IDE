import { 
    IconFolder,
    IconSearch,
    IconBrandGithub,
    IconBug,
  } from '@tabler/icons-react';
  import SearchBar from './SearchBar';
  import SourceControl from './SourceControl';
  import Debug from './Debug';
  
  export default function ActivityBar({ activeView, onViewChange }) {
    const items = [
      {
        id: 'explorer',
        icon: <IconFolder size={24} />,
        tooltip: 'Explorer',
        component: null // Explorer is handled by Sidebar component
      },
      {
        id: 'search',
        icon: <IconSearch size={24} />,
        tooltip: 'Search',
        component: <SearchBar />
      },
      {
        id: 'git',
        icon: <IconBrandGithub size={24} />,
        tooltip: 'Source Control',
        component: <SourceControl />
      },
      {
        id: 'debug',
        icon: <IconBug size={24} />,
        tooltip: 'Run and Debug',
        component: <Debug />
      }
    ];
  
    return (
      <div className="flex">
        {/* Activity Bar Icons */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 flex-shrink-0">
          {items.map(item => (
            <button
              key={item.id}
              className={`p-3 hover:bg-[#505050] rounded-lg mb-2 ${
                activeView === item.id ? 'bg-[#505050]' : ''
              }`}
              onClick={() => onViewChange(item.id)}
              title={item.tooltip}
            >
              {item.icon}
            </button>
          ))}
        </div>
  
        {/* View Content */}
        {activeView && items.find(item => item.id === activeView)?.component}
      </div>
    );
  }