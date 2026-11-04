import React from "react";
import {
  FileCodeIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  HomeIcon,
  LayoutGridIcon,
  Code2Icon,
} from "lucide-react";

export const FileIcon = ({ name, isDir, isOpen }) => {
  if (isDir) {
    if (name === "home")
      return <HomeIcon size={14} className="text-rose-400 shrink-0" />;
    if (name === "layout")
      return <LayoutGridIcon size={14} className="text-sky-400 shrink-0" />;
    if (name === "components")
      return <Code2Icon size={14} className="text-lime-400 shrink-0" />;
    if (name === "pages")
      return <FolderIcon size={14} className="text-orange-400 shrink-0" />;
    if (name === "context")
      return <FolderIcon size={14} className="text-emerald-400 shrink-0" />;

    return isOpen ? (
      <FolderOpenIcon size={14} className="text-slate-400 shrink-0" />
    ) : (
      <FolderIcon size={14} className="text-slate-400 shrink-0" />
    );
  }

  if (name.endsWith(".jsx") || name.endsWith(".tsx"))
    return <FileCodeIcon size={14} className="text-cyan-400 shrink-0" />;
  if (name.endsWith(".js") || name.endsWith(".ts"))
    return <FileCodeIcon size={14} className="text-amber-400 shrink-0" />;
  if (name.endsWith(".css"))
    return <FileTextIcon size={14} className="text-sky-400 shrink-0" />;
  if (name.endsWith(".json"))
    return <FileTextIcon size={14} className="text-emerald-400 shrink-0" />;

  return <FileTextIcon size={14} className="text-slate-400 shrink-0" />;
};