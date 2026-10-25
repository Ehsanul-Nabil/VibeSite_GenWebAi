import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";

import { detectDependencies } from "../utils/sandpackUtils";
import { useAppContext } from "../context/AppContext";
import SandpackErrorMonitor from "./SandpackErrorMonitor";

// Watches live Sandpack files and synchronizes changes outward.
function SandpackFileWatcher({ onLiveFilesChange }) {
  const { sandpack } = useSandpack();
  const files = sandpack.files;

  const { activeProject, updateProjectFiles } = useAppContext();

  const activeProjectRef = useRef(activeProject);
  const onLiveFilesChangeRef = useRef(onLiveFilesChange);
  const updateProjectFilesRef = useRef(updateProjectFiles);

  // Keep the latest references without recreating the watcher.
  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  useEffect(() => {
    onLiveFilesChangeRef.current = onLiveFilesChange;
  }, [onLiveFilesChange]);

  useEffect(() => {
    updateProjectFilesRef.current = updateProjectFiles;
  }, [updateProjectFiles]);

  // Avoid repeated database updates for identical file contents.
  const lastSavedFilesRef = useRef("");

  useEffect(() => {
    const project = activeProjectRef.current;
    if (!project) return;

    const updatedFiles = {};

    for (const [path, fileObj] of Object.entries(files)) {
      updatedFiles[path] =
        typeof fileObj === "string"
          ? fileObj
          : fileObj?.code ?? "";
    }

    // Notify the parent about the current live code.
    onLiveFilesChangeRef.current?.(updatedFiles);

    const filesSignature = JSON.stringify(updatedFiles);

    // Skip identical file snapshots.
    if (lastSavedFilesRef.current === filesSignature) {
      return;
    }

    // Compare live code with the latest saved project.
    let hasChanges = false;

    for (const [path, code] of Object.entries(updatedFiles)) {
      const savedFile = project.files?.[path];

      const savedCode =
        typeof savedFile === "string"
          ? savedFile
          : savedFile?.content ?? "";

      if (savedCode !== code) {
        hasChanges = true;
        break;
      }
    }

    if (hasChanges) {
      lastSavedFilesRef.current = filesSignature;
      updateProjectFilesRef.current?.(updatedFiles);
    }
  }, [files]);

  return null;
}

const PreviewPanel = ({ project, activeFile, showCode }) => {
  const [showErrorOverlay, setShowErrorOverlay] = useState(true);
  const [liveFiles, setLiveFiles] = useState({});
  const previousProjectKeyRef = useRef(null);

  const currentProjectKey = `${project._id}-${project.version}`;

  // Create the initial Sandpack files for this project.
  const initialSandpackFiles = useMemo(() => {
    const spFiles = {};

    for (const [path, content] of Object.entries(project.files ?? {})) {
      const code =
        typeof content === "string"
          ? content
          : content?.content ?? "";

      spFiles[path] = { code };
    }

    return spFiles;
  }, [project._id]);

  // Detect dependencies from the project's original files.
  const dependencies = useMemo(() => {
    return detectDependencies(project.files ?? {});
  }, [project._id]);

  // Receive live changes without passing them back into SandpackProvider.
  const handleLiveFilesChange = useCallback((newFiles) => {
    setLiveFiles((previousFiles) => {
      const previousPaths = Object.keys(previousFiles);
      const newPaths = Object.keys(newFiles);

      if (
        previousPaths.length === newPaths.length &&
        newPaths.every((path) => previousFiles[path] === newFiles[path])
      ) {
        return previousFiles;
      }

      return newFiles;
    });
  }, []);

  // Clear local snapshots when the project changes.
  useEffect(() => {
    if (previousProjectKeyRef.current !== currentProjectKey) {
      previousProjectKeyRef.current = currentProjectKey;
      setLiveFiles({});
    }
  }, [currentProjectKey]);



// const dependencies2 = {
//   // Routing
// //   "react-router-dom": "latest",

//   // Icons
//   "lucide-react": "latest",
//   "react-icons": "latest",
//   "@fortawesome/react-fontawesome": "latest",
//   "@fortawesome/fontawesome-svg-core": "latest",
//   "@fortawesome/free-solid-svg-icons": "latest",
//   "@fortawesome/free-brands-svg-icons": "latest",
//   "@fortawesome/free-regular-svg-icons": "latest",

//   // Animations
//   "framer-motion": "latest",
//   "motion": "latest",
//   "gsap": "latest",
//   "react-type-animation": "latest",

//   // UI components and styling utilities
//   "clsx": "latest",
//   "tailwind-merge": "latest",
//   "class-variance-authority": "latest",
//   "react-hot-toast": "latest",
//   "sonner": "latest",

//   // Forms
//   "react-hook-form": "latest",
//   "zod": "latest",
//   "@hookform/resolvers": "latest",

//   // Charts and data visualization
//   "recharts": "latest",
//   "chart.js": "latest",
//   "react-chartjs-2": "latest",

//   // Sliders and carousels
//   "swiper": "latest",
//   "embla-carousel-react": "latest",

//   // Utilities
//   "date-fns": "latest",
//   "axios": "latest",
//   "zustand": "latest",
//   "react-countup": "latest",

//   // React utilities
//   "react-helmet-async": "latest"
// };



  return (
    <div className="h-full w-full">
      <SandpackProvider
        key={project._id}
        template="react"
        files={initialSandpackFiles}
        customSetup={dependencies}
    //    customSetup={{
    //     dependencies: {
    //         ...dependencies,
    //         ...dependencies2,
    //     },
    //     }} 
        // theme="dark"
        options={{
          externalResources: [
            "https://cdn.tailwindcss.com",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
          ],
          classes: {
            "sp-wrapper": "sp-wrapper",
            "sp-layout": "sp-layout",
            "sp-preview": "sp-preview",
          },
          logLevel: 0,
        }}
        // theme={{
        //   colors: {
        //     surface1: "#ffffff",
        //     surface2: "#f4f4f5",
        //     surface3: "#e4e4e7",
        //     clickable: "#71717a",
        //     base: "#09090b",
        //     disabled: "#a1a1aa",
        //     hover: "#18181b",
        //     accent: "#18181b",
        //     error: "#ef4444",
        //     errorSurface: "#fef2f2",
        //   },
        //   font: {
        //     body: "'Urbanist', system-ui, -apple-system, sans-serif",
        //     mono: "'Geist Mono', ui-monospace, monospace",
        //     size: "13px",
        //     lineHeight: "1.6",
        //   },
        // }}
        theme={{
            colors: {
                surface1: "#18181b",       // Main editor background
                surface2: "#202024",       // Tabs and secondary surfaces
                surface3: "#2d2d35",       // Borders and elevated surfaces

                clickable: "#a1a1aa",      // Icons and clickable elements
                base: "#e4e4e7",           // Primary text
                disabled: "#71717a",       // Disabled text

                hover: "#27272a",          // Hover background
                accent: "#818cf8",         // Modern indigo accent

                error: "#fb7185",          // Error color
                errorSurface: "#3f2028",   // Error background
            },

            font: {
                body: "'Inter', system-ui, -apple-system, sans-serif",
                mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                size: "13px",
                lineHeight: "1.7",
            },
            }}
      
      >
        <SandpackFileWatcher
          onLiveFilesChange={handleLiveFilesChange}
        />

        <SandpackErrorMonitor
          onErrorChange={setShowErrorOverlay}
        />

        <SandpackLayout
          style={{
            height: "100%",
            border: "none",
            borderRadius: 0,
            background: "transparent",
          }}
        >
          {showCode && (
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{
                height: "100%",
                flex: 1,
                minWidth: 0,
              }}
            />
          )}

          <SandpackPreview
            showNavigator={false}
            showRefreshButton
            showOpenInCodeSandbox={false}
            showSandpackErrorOverlay={showErrorOverlay}
            style={{
              height: "100%",
              flex: showCode ? 1 : 2,
              minWidth: 0,
            }}
          />
        </SandpackLayout>
      </SandpackProvider>

    </div>
  );
};

export default PreviewPanel;
