import React from "react";

export interface CrystalTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CrystalTabsProps {
  tabs: CrystalTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CrystalTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  style,
}: CrystalTabsProps) {
  return (
    <div
      className={`crystal-tabs flex bg-white/5 rounded-2xl p-1 border border-white/10 ${className}`}
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            className={`flex-1 px-4 py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-blue-500/20 border border-blue-400/30 text-blue-400 font-semibold"
                : "text-slate-300 hover:text-slate-200 hover:bg-white/5"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <div className="mb-1">{tab.icon}</div>}
            <span className="text-sm">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
