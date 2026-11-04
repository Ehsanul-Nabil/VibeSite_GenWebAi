// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { useNavigate, useParams } from 'react-router-dom';
// import Loading from '../components/Loading';
// import BuilderHeader from '../components/BuilderHeader';
// import { FolderTreeIcon, MessageSquareIcon } from 'lucide-react';
// import ChatPanel from '../components/ChatPanel';
// import FileExplorer from '../components/FileExplorer';
// import PreviewPanel from '../components/PreviewPanel';
// import AgentProgressDashboard from '../components/AgentProgressDashboard';
// import PublishModal from '../components/PublishModeal';
// import { exportProjectZip } from '../utils/exportProject';
// import toast from 'react-hot-toast';
// import api from '../api/api';

// const BuilderPage = () => {

//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [leftTab, setLeftTab] = useState("chat");
//   const [publishing, setPublishing] = useState(false);
//   const [publishUrl, setPublishUrl] = useState(null);

//   const {activeProject, loadingActiveProject, activeFile, showCode, setActiveFile,
//   setShowCode, loadProject, logout, chatLoading, handleChat} = useAppContext();


//   // useEffect(()=>{
//   //   if(!id) return;
//   //   loadProject(id)
//   // },[id, loadProject])

//   useEffect(()=>{
//     if(!id) return;
//     loadProject(id)
//   },[id])// fillup the activeProject by context

//   // useEffect(()=>{
//   //   if(!id || !activeProject) return;
//   //   if(activeProject.status === "pending" || activeProject.status === "generating"){
//   //     const interval = setInterval(()=>{
//   //       loadProject(id, true)
//   //     },1500)
//   //     return ()=> clearInterval(interval)
//   //   }
//   // },[id, loadProject, activeProject])

//   const handleOpenPreview = ()=>{
//     if(!id) return;
//     window.open(`/preview/${id}`,"_blank")
//   }

//  const handlePublish = async () => {
//     if(!id) return;
//     setPublishing(true)
//     try {
//       await api.post(`/api/projects/${id}/publish`);
//       const url = `${window.location.origin}/publish/${id}`;
//       setPublishUrl(url);
//       toast.success("Website published successfully!")
//     } catch (err) {
//       console.error("Publish failed:", err);
//       toast.error(err?.response?.data?.error || "Publish failed");
//     } finally{
//       setPublishing(false)
//     }
//   }

//  const handleDownload = () => {
//     if(!activeProject) return;
//     exportProjectZip(activeProject)
//   }

//   if(loadingActiveProject || !activeProject){
//     return <Loading />
//   }

//   return (
//     <div className="h-screen flex flex-col bg-white overflow-hidden text-zinc-900 relative">
//       {/* Top Bar Header */}
//       <BuilderHeader
//       projectName={activeProject.name}
//       version={activeProject.version}
//       showCode={showCode}
//       publishing={publishing}
//       onToggleShowCode={()=> setShowCode(!showCode)}
//       onOpenPreview={handleOpenPreview}
//       onPublish={handlePublish}
//       onDownload={handleDownload}
//       onBack={()=> navigate("/dashboard")}
//       onLogout={logout} />


//       {/* Main Layout */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white">
//             {/* Sidebar Tabs */}
//             <div className="flex border-b border-zinc-100">
//                 <button onClick={()=> setLeftTab("chat")}
//                 className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs
//                 font-medium cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}>
//                     <MessageSquareIcon size={13} /> Chat
//                 </button>
//                 <button onClick={()=> setLeftTab("files")}
//                 className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs
//                 font-medium cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2  border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}>
//                     <FolderTreeIcon size={13} /> Files
//                 </button>
//             </div>

//             {/* Sidebar Content */}
//             <div className="flex-1 overflow-hidden">
//                 {
//                     leftTab === 'chat' ? (
//                         <ChatPanel messages={activeProject.messages} onSend={handleChat} loading={chatLoading} />
//                     ) : (
//                       <FileExplorer files={activeProject.files} activeFile={activeFile}
//                     onFileSelect={(path)=>{
//                     setActiveFile(path);
//                     setShowCode(true)
//                 }}/>
//                     )
//                 }
//             </div>
//         </div>





//         {/* Preview / Code Area */}
//         <div className="flex-1 overflow-hidden">
//             {activeProject.status === "pending" || activeProject.status === "generating" ||
//             activeProject.status === "failed" ? (
//                 <AgentProgressDashboard project={activeProject} />
//             ) : (
//                 <PreviewPanel project={activeProject} activeFile={activeFile} showCode=
//                 {showCode}/>
//             )}
//         </div>

        
//       </div>

//       {publishUrl && <PublishModal publishUrl={publishUrl} onClose={() => setPublishUrl(null)}/>}
//     </div>
//   )
// }

// export default BuilderPage






import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import BuilderHeader from '../components/BuilderHeader';
import { FolderTreeIcon, MessageSquareIcon } from 'lucide-react';
import ChatPanel from '../components/ChatPanel';
// import FileExplorer from '../components/FileExplorer';
import FileExplorer from '../components/fileExplorer';
import PreviewPanel from '../components/PreviewPanel';
import AgentProgressDashboard from '../components/AgentProgressDashboard';
import PublishModal from '../components/PublishModeal';
import { exportProjectZip } from '../utils/exportProject';
import toast from 'react-hot-toast';
import api from '../api/api';

const BuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

  const {
    activeProject,
    loadingActiveProject,
    activeFile,
    showCode,
    setActiveFile,
    setShowCode,
    loadProject,
    logout,
    chatLoading,
    handleChat,
  } = useAppContext();

  useEffect(() => {
    if (!id) return;
    loadProject(id);
  }, [id]);

  const handleOpenPreview = () => {
    if (!id) return;
    window.open(`/preview/${id}`, "_blank");
  };

  const handlePublish = async () => {
    if (!id) return;
    setPublishing(true);
    try {
      await api.post(`/api/projects/${id}/publish`);
      const url = `${window.location.origin}/publish/${id}`;
      setPublishUrl(url);
      toast.success("Website published successfully!");
    } catch (err) {
      console.error("Publish failed:", err);
      toast.error(err?.response?.data?.error || "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  const handleDownload = () => {
    if (!activeProject) return;
    exportProjectZip(activeProject);
  };

  if (loadingActiveProject || !activeProject) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-[#070b12] overflow-hidden text-slate-100 relative font-sans selection:bg-cyan-500/20">
      {/* Top Bar Header */}
      <BuilderHeader
        projectName={activeProject.name}
        version={activeProject.version}
        showCode={showCode}
        publishing={publishing}
        onToggleShowCode={() => setShowCode(!showCode)}
        onOpenPreview={handleOpenPreview}
        onPublish={handlePublish}
        onDownload={handleDownload}
        onBack={() => navigate("/dashboard")}
        onLogout={logout}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Chat / Files Navigation) */}
        <div className="w-[340px] shrink-0 flex flex-col border-r border-slate-800/80 bg-[#070b12]">
          {/* Sidebar Tabs Header */}
          <div className="flex border-b border-slate-800/80 bg-[#090d16]/80 p-1">
            <button
              onClick={() => setLeftTab("chat")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                leftTab === "chat"
                  ? "bg-slate-800/90 text-cyan-400 border border-slate-700/60 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <MessageSquareIcon size={14} className={leftTab === "chat" ? "text-cyan-400" : "text-slate-400"} />
              <span>Chat</span>
            </button>

            <button
              onClick={() => setLeftTab("files")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                leftTab === "files"
                  ? "bg-slate-800/90 text-cyan-400 border border-slate-700/60 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <FolderTreeIcon size={14} className={leftTab === "files" ? "text-cyan-400" : "text-slate-400"} />
              <span>Files</span>
            </button>
          </div>

          {/* Sidebar Content Panel */}
          <div className="flex-1 overflow-hidden relative">
            {leftTab === "chat" ? (
              <ChatPanel
                messages={activeProject.messages}
                onSend={handleChat}
                loading={chatLoading}
              />
            ) : (
              <FileExplorer
                files={activeProject.files}
                activeFile={activeFile}
                onFileSelect={(path) => {
                  setActiveFile(path);
                  setShowCode(true);
                }}
              />
            )}
          </div>
        </div>

        {/* Main Workspace Preview / Code / Build Area */}
        <div className="flex-1 overflow-hidden bg-[#070b12] relative">
          {activeProject.status === "pending" ||
          activeProject.status === "generating" ||
          activeProject.status === "failed" ? (
            <AgentProgressDashboard project={activeProject} />
          ) : (
            <PreviewPanel
              project={activeProject}
              activeFile={activeFile}
              showCode={showCode}
            />
          )}
        </div>
      </div>

      {/* Publish Live Link Modal */}
      {publishUrl && (
        <PublishModal
          publishUrl={publishUrl}
          onClose={() => setPublishUrl(null)}
        />
      )}
    </div>
  );
};

export default BuilderPage;