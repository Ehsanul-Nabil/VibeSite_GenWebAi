import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { TreeGuideLine } from "./TreeGuideLine";

export const TreeItem = ({ node, activeFile, onFileSelect, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = node.path === activeFile;

  if (node.isDir) {
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between py-1 px-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-xs cursor-pointer select-none transition-colors group"
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {isOpen ? (
              <ChevronDownIcon size={13} className="text-slate-400 shrink-0" />
            ) : (
              <ChevronRightIcon size={13} className="text-slate-400 shrink-0" />
            )}
            <FileIcon name={node.name} isDir={true} isOpen={isOpen} />
            <span className="truncate">{node.name}</span>
          </div>

          {node.children.length > 0 && (
            <span className="text-[10px] text-slate-600 font-mono group-hover:text-slate-400">
              •
            </span>
          )}
        </div>

        {isOpen && (
          <div className="relative">
            <TreeGuideLine depth={depth} />
            {node.children.map((child) => (
              <TreeItem
                key={child.path}
                node={child}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(node.path)}
      className={`w-full flex items-center justify-between py-1 px-2 text-xs font-sans transition-all rounded-xs cursor-pointer select-none ${
        isActive
          ? "bg-slate-800/80 text-white font-medium border border-amber-500/60 shadow-xs"
          : "text-slate-300 hover:bg-slate-800/40 hover:text-white border border-transparent"
      }`}
      style={{ paddingLeft: `${depth * 14 + 22}px` }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <FileIcon name={node.name} isDir={false} isOpen={false} />
        <span className="truncate">{node.name}</span>
      </div>

      {node.badge && (
        <span className="text-[10px] font-mono text-slate-500 pl-2">
          {node.badge}
        </span>
      )}
    </button>
  );
};