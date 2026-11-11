import React from "react";
import { CheckCircle2Icon, CircleIcon, Loader2Icon, AlertCircleIcon, SparklesIcon } from "lucide-react";

export default function AgentProgressDashboard({ project }) {
    const planned = project.filesPlanned || [];
    const completed = project.filesGenerated || [];
    const current = project.currentFile;
    const isFailed = project.status === "failed";

    const progressPercentage = planned.length > 0 ? Math.round((completed.length / planned.length) * 100) : 0;

    return (
        <div className="h-full w-full bg-[#070b12] flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
            <div className="max-w-xl w-full bg-[#0c121e]/90 border border-slate-800/90 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                {/* Background Ambient Glow */}
                <div className="absolute -top-24 -right-24 size-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 size-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Status Header */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 shadow-inner">
                        {isFailed ? (
                            <AlertCircleIcon size={20} className="text-rose-400" />
                        ) : (
                            <SparklesIcon size={20} className="text-cyan-400 animate-pulse" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-100">
                            {isFailed
                                ? "Generation Failed"
                                : project.status === "pending"
                                  ? "Planning Architecture..."
                                  : "AI Agent is Building..."}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {isFailed ? "An error occurred during build" : "Writing production-ready React codebase"}
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                {isFailed && project.error && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-400 font-medium flex items-start gap-2.5">
                        <AlertCircleIcon size={18} className="shrink-0 mt-0.5" />
                        <span>Error: {project.error}</span>
                    </div>
                )}

                {/* Progress bar */}
                {planned.length > 0 && !isFailed && (
                    <div className="mb-6 relative z-10">
                        <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            <span>Progress</span>
                            <span className="text-cyan-400 font-mono">{progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Files checklist */}
                {planned.length > 0 ? (
                    <div className="relative z-10">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                            Planned Files ({completed.length}/{planned.length})
                        </span>
                        <div className="space-y-2.5 max-h-75 overflow-y-auto pr-1 custom-scrollbar">
                            {planned.map((file) => {
                                const isCompleted = completed.includes(file.path);
                                const isGenerating = current === file.path;

                                return (
                                    <div
                                        key={file.path}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                                            isGenerating
                                                ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                                : isCompleted
                                                  ? "bg-slate-900/60 border-slate-800/80"
                                                  : "bg-slate-900/30 border-slate-800/40 opacity-50"
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2Icon size={16} className="text-emerald-400 shrink-0" />
                                        ) : isGenerating ? (
                                            <Loader2Icon size={16} className="animate-spin text-cyan-400 shrink-0" />
                                        ) : (
                                            <CircleIcon size={16} className="text-slate-600 shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-xs font-mono truncate ${
                                                    isGenerating ? "text-cyan-300 font-semibold" : isCompleted ? "text-slate-200" : "text-slate-400"
                                                }`}
                                            >
                                                {file.path}
                                            </p>
                                            <p className="text-[10px] text-slate-500 truncate mt-0.5">{file.description}</p>
                                        </div>
                                        {isGenerating && (
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold animate-pulse uppercase tracking-wider shrink-0">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    !isFailed && (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400 relative z-10">
                            <Loader2Icon size={26} className="animate-spin mb-3 text-cyan-400" />
                            <p className="text-xs text-slate-400 font-medium">Analyzing requirements and designing project structure...</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}