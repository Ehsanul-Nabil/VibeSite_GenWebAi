import React from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  Code2Icon,
  ExternalLinkIcon,
  Loader2Icon,
  GlobeIcon,
  DownloadIcon,
} from "lucide-react";

const BuilderHeader = ({
  projectName,
  version,
  showCode,
  publishing,
  onToggleShowCode,
  onOpenPreview,
  onPublish,
  onDownload,
  onBack,
  onLogout,
}) => {
  const buttonClass =
    "inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 text-xs font-medium rounded-lg cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-zinc-200 bg-white">
      {/* Left Section */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onBack}
          className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 cursor-pointer"
        >
          <ArrowLeftIcon size={16} />
        </button>

        <img src="/logo.svg" alt="Logo" className="invert size-5" />

        <span className="text-sm font-semibold truncate max-w-38 md:max-w-50">
          {projectName}
        </span>

        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-medium">
          v{version}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {/* Code / Preview Toggle */}
        <button
          onClick={onToggleShowCode}
          className={`${buttonClass} ${
            showCode ? "bg-zinc-100 text-zinc-900" : ""
          }`}
        >
          {showCode ? (
            <>
              <EyeIcon size={13} />
              Preview
            </>
          ) : (
            <>
              <Code2Icon size={13} />
              Code
            </>
          )}
        </button>

        {/* Open Preview */}
        <button onClick={onOpenPreview} className={buttonClass}>
          <ExternalLinkIcon size={13} />
          Open Preview
        </button>

        {/* Publish */}
        <button
          onClick={onPublish}
          disabled={publishing}
          className={buttonClass}
        >
          {publishing ? (
            <Loader2Icon size={13} className="animate-spin" />
          ) : (
            <GlobeIcon size={13} />
          )}
          Publish
        </button>

        {/* Export */}
        <button onClick={onDownload} className={buttonClass}>
          <DownloadIcon size={13} />
          Export
        </button>

        {/* Sign Out */}
        <button onClick={onLogout} className={buttonClass}>
          Sign out
        </button>
      </div>
    </header>
  );
};

export default BuilderHeader;