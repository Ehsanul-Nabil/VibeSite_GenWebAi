// import React from "react";
// import {
//   ArrowLeftIcon,
//   EyeIcon,
//   Code2Icon,
//   ExternalLinkIcon,
//   Loader2Icon,
//   GlobeIcon,
//   DownloadIcon,
// } from "lucide-react";

// const BuilderHeader = ({
//   projectName,
//   version,
//   showCode,
//   publishing,
//   onToggleShowCode,
//   onOpenPreview,
//   onPublish,
//   onDownload,
//   onBack,
//   onLogout,
// }) => {
//   const buttonClass =
//     "inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 text-xs font-medium rounded-lg cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed";

//   return (
//     <header className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-zinc-200 bg-white">
//       {/* Left Section */}
//       <div className="flex items-center gap-2 min-w-0">
//         <button
//           onClick={onBack}
//           className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 cursor-pointer"
//         >
//           <ArrowLeftIcon size={16} />
//         </button>

//         <img src="/logo.svg" alt="Logo" className="invert size-5" />

//         <span className="text-sm font-semibold truncate max-w-38 md:max-w-50">
//           {projectName}
//         </span>

//         <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-medium">
//           v{version}
//         </span>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-1.5 overflow-x-auto">
//         {/* Code / Preview Toggle */}
//         <button
//           onClick={onToggleShowCode}
//           className={`${buttonClass} ${
//             showCode ? "bg-zinc-100 text-zinc-900" : ""
//           }`}
//         >
//           {showCode ? (
//             <>
//               <EyeIcon size={13} />
//               Preview
//             </>
//           ) : (
//             <>
//               <Code2Icon size={13} />
//               Code
//             </>
//           )}
//         </button>

//         {/* Open Preview */}
//         <button onClick={onOpenPreview} className={buttonClass}>
//           <ExternalLinkIcon size={13} />
//           Open Preview
//         </button>

//         {/* Publish */}
//         <button
//           onClick={onPublish}
//           disabled={publishing}
//           className={buttonClass}
//         >
//           {publishing ? (
//             <Loader2Icon size={13} className="animate-spin" />
//           ) : (
//             <GlobeIcon size={13} />
//           )}
//           Publish
//         </button>

//         {/* Export */}
//         <button onClick={onDownload} className={buttonClass}>
//           <DownloadIcon size={13} />
//           Export
//         </button>

//         {/* Sign Out */}
//         <button onClick={onLogout} className={buttonClass}>
//           Sign out
//         </button>
//       </div>
//     </header>
//   );
// };

// export default BuilderHeader;


import React from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  Code2Icon,
  ExternalLinkIcon,
  Loader2Icon,
  GlobeIcon,
  DownloadIcon,
  LogOutIcon,
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
  // Dark theme button base style matching VibeSite.AI theme
  const buttonClass =
    "inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-slate-800/80 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shrink-0";

  return (
    <header className="h-13 shrink-0 flex items-center justify-between px-3 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-30">
      {/* Left Section: Branding & Navigation */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeftIcon size={16} />
        </button>

        <div className="h-4 w-px bg-slate-800" />

        <div className="flex items-center gap-2 min-w-0">
          <img src="/logo.svg" alt="VibeSite.AI Logo" className="size-5 shrink-0" />

          <span className="text-xs font-semibold text-slate-100 truncate max-w-[130px] sm:max-w-[200px]">
            {projectName}
          </span>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/70 text-cyan-400 font-mono font-medium border border-cyan-500/20 shrink-0">
            v{version}
          </span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {/* Code / Preview Segmented Toggle */}
        <button
          onClick={onToggleShowCode}
          className={`${buttonClass} ${
            showCode
              ? "!bg-cyan-500/10 !text-cyan-400 !border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
              : ""
          }`}
        >
          {showCode ? (
            <>
              <EyeIcon size={13} className="text-cyan-400" />
              <span>Preview</span>
            </>
          ) : (
            <>
              <Code2Icon size={13} />
              <span>Code</span>
            </>
          )}
        </button>

        {/* Open Preview */}
        <button onClick={onOpenPreview} className={buttonClass}>
          <ExternalLinkIcon size={13} className="text-slate-400" />
          <span>Open Preview</span>
        </button>

        {/* Publish Button with Primary Glowing Gradient (VibeSite Accent) */}
        <button
          onClick={onPublish}
          disabled={publishing}
          className={`${buttonClass} border-purple-500/40 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]`}
        >
          {publishing ? (
            <Loader2Icon size={13} className="animate-spin text-white" />
          ) : (
            <GlobeIcon size={13} className="text-white" />
          )}
          <span>Publish</span>
        </button>

        {/* Export */}
        <button onClick={onDownload} className={buttonClass}>
          <DownloadIcon size={13} className="text-slate-400" />
          <span>Export</span>
        </button>

        <div className="h-4 w-px bg-slate-800 mx-0.5 shrink-0" />

        {/* Sign Out */}
        <button
          onClick={onLogout}
          className={`${buttonClass} border-transparent bg-transparent text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20`}
        >
          <LogOutIcon size={13} />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
};

export default BuilderHeader;