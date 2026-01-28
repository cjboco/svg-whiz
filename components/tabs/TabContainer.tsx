'use client';

import { type TabId, useSvg } from '@/context/SvgContext';
import { FiCode, FiDownload, FiEye, FiPackage, FiTool } from 'react-icons/fi';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  { id: 'preview', label: 'Preview', icon: <FiEye className='w-4 h-4' /> },
  { id: 'export', label: 'Export', icon: <FiDownload className='w-4 h-4' /> },
  { id: 'code', label: 'Code', icon: <FiCode className='w-4 h-4' /> },
  { id: 'tools', label: 'Tools', icon: <FiTool className='w-4 h-4' /> },
  { id: 'generate', label: 'Generate', icon: <FiPackage className='w-4 h-4' /> },
];

interface TabContainerProps {
  children: Record<TabId, React.ReactNode>;
}

export function TabContainer({ children }: TabContainerProps) {
  const { activeTab, setActiveTab } = useSvg();

  return (
    <div className='w-full max-w-4xl mx-auto'>
      {/* Tab Navigation */}
      <div className='flex justify-center border-b border-zinc-300 dark:border-zinc-700 mb-6'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type='button'
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold font-[Helvetica,_Arial,_sans-serif] text-sm transition-colors border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? 'border-fuchsia-600 text-fuchsia-600 dark:border-fuchsia-400 dark:text-fuchsia-400'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
          >
            {tab.icon}
            <span className='hidden sm:inline'>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='min-h-[400px]'>{children[activeTab]}</div>
    </div>
  );
}
