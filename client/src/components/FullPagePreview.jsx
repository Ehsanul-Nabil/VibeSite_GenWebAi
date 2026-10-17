import React, { useMemo, useState } from 'react';
import { detectDependencies } from '../utils/sandpackUtils';
import SandpackErrorMonitor from './SandpackErrorMonitor';
import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

const FullPagePreview = ({files}) => {
//   files=  {
//   "/App.js": "console.log('Hello');",
//   "/styles.css": "body { color: red; }"
// }

    const [showErrorOverlay, setShowErrorOverlay] = useState(true)
    
// Convert liveFiles to Sandpack format
// This code converts your normal files object into the format that Sandpack needs to display and run your project code.
    const sandpackFiles = useMemo(()=>{
        if(!files) return {};
        const spFiles = {};
        for (const [path, content] of Object.entries(files)) {
            spFiles[path] = { code: content }
        }
        return spFiles;
    },[files])
//          Before: Normal files object
// {
//   "/App.js": "console.log('Hello');",
//   "/styles.css": "body { color: red; }"
// }

//          After: Sandpack files format
// {
//   "/App.js": {
//     code: "console.log('Hello');"
//   },
//   "/styles.css": {
//     code: "body { color: red; }"
//   }
// }




    const dependencies = useMemo(()=>{
        if(!files) return {};
        return detectDependencies(files)
    },[files])

    return (
            <div className="h-screen w-screen bg-white overflow-hidden">
                <SandpackProvider  template='react'
                files={sandpackFiles}
                customSetup={dependencies}
                options={{
                    externalResources: [
                        "https://cdn.tailwindcss.com",
                        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
                    ],
                    logLevel: 0,
                }}
                className="h-full w-full" >
        
                    <SandpackErrorMonitor onErrorChange={setShowErrorOverlay}/>
                    <SandpackLayout className="h-full w-full border-none! bg-transparent!">
                        <SandpackPreview 
                        showNavigator={false} 
                        showRefreshButton={false}
                        showOpenInCodeSandbox={false} 
                        showSandpackErrorOverlay={showErrorOverlay}
                        className="h-full w-full"
                        />
                    </SandpackLayout>
                    
                </SandpackProvider>
            </div>
    );
};

export default FullPagePreview;