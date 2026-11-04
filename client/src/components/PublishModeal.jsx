// import { XIcon } from 'lucide-react';
// import React from 'react';
// import toast from 'react-hot-toast';

// const PublishModal = ({ publishUrl, onClose }) => {
//     const handleCopyLink = () => {
//         if(!publishUrl) return;
//         navigator.clipboard.writeText(publishUrl);
//         toast.success("Public link copied to clipboard!")
//     }
//     return (
//     <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center
//     justify-center z-50">
//         <div className="bg-white border border-zinc-200 shadow-lg rounded-xl max-w-md w-full
//         p-6 mx-4 relative">
//             <button onClick={onClose} className='absolute top-4 right-4 text-zinc-400
//             hover:text-zinc-900 cursor-pointer'>
//                 <XIcon size={16}/>
//             </button>

//             <div className="mb-6">
//                 <h3 className="text-lg font-medium text-zinc-900 mb-1">Your website is
//                 live!</h3>
//                 <p className="text-sm text-zinc-500">Anyone with the link below can view
//                 your published site.</p>
//             </div>

//             <div className="space-y-4">
//                 <div>
//                     <label className="block text-[10px] font-semibold text-zinc-400
//                     uppercase tracking-widest mb-1.5">
//                         Published Link
//                     </label>
//                     <input type="text" readOnly value={publishUrl} className="w-full px-0
//                     py-2 border-b border-zinc-200 text-sm text-zinc-900 bg-transparent
//                     outline-none"/>
//                 </div>

//                 <div className="flex gap-2 pt-2">
//                     <button onClick={handleCopyLink} className='flex-1 py-2 bg-zinc-950
//                     text-white text-xs font-medium hover:bg-zinc-800 cursor-pointer
//                     rounded-lg text-center'>
//                         Copy Link
//                     </button>
//                     <button
//                     onClick={()=> window.open(publishUrl, '_blank')}
//                     className='flex-1 py-2 border border-zinc-200 text-zinc-700 text-xs
//                     font-medium hover:bg-zinc-50 rounded-lg text-center'>
//                         Open Site
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default PublishModal



import { XIcon, CopyIcon, ExternalLinkIcon, CheckIcon, GlobeIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PublishModal = ({ publishUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!publishUrl) return;
    navigator.clipboard.writeText(publishUrl);
    setCopied(true);
    toast.success("Public link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#070b12]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0c121e]/95 border border-slate-800/90 shadow-[0_0_50px_rgba(0,0,0,0.7)] rounded-2xl max-w-md w-full p-6 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Glowing Background Accents */}
        <div className="absolute -top-20 -right-20 size-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-40 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

    {/* Close Button - Increased z-index & explicit size bounding box */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer z-20"
        >
          <XIcon size={16} />
        </button>

         {/* <button onClick={onClose} className='absolute top-4 right-4 text-zinc-400
        hover:text-zinc-900 cursor-pointer'>
                 <XIcon size={16}/>
            </button> */}

        {/* Header Section */}
        <div className="mb-6 flex items-start gap-3.5 relative z-10 pr-6">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
            <GlobeIcon size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 mb-0.5">
              Your website is live!
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Anyone with the link below can view your published site.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
              Published Link
            </label>
            <input
              type="text"
              readOnly
              value={publishUrl || ""}
              className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 outline-none focus:border-cyan-500/40 transition-colors selection:bg-cyan-500/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <CheckIcon size={14} className="text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={14} />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.open(publishUrl, '_blank')}
              className="flex-1 py-2.5 px-4 border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white text-xs font-medium rounded-xl transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ExternalLinkIcon size={14} className="text-slate-400" />
              <span>Open Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;