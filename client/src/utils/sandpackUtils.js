// // Scans source files to detect npm dependencies from import statements
// export function detectDependencies(files) {
//     const deps = {};
//     if (!files) return deps;

//     const allCode = Object.values(files).join("\n");
//     const filePaths = Object.keys(files);

//     const isLocalFileOrFolder = (pkgName) => {
//         const name = pkgName.startsWith("@/") ? pkgName.substring(2) : pkgName;
//         return (
//             pkgName.startsWith("@/") ||
//             pkgName === "@" ||
//             filePaths.some(p => 
//                 p === `/${name}` || 
//                 p.startsWith(`/${name}/`) || 
//                 p.replace(/\.[^/.]+$/, "") === `/${name}`
//             )
//         );
//     };

//     const importRegex = /from\s+['"]([^./][^'"]*)['"]/g;
//     let match;
//     while ((match = importRegex.exec(allCode)) !== null) {
//         const rawImport = match[1];

//         // Scoped packages like @scope/package, normal packages like package
//         const pkg = rawImport.startsWith("@") && !rawImport.startsWith("@/")
//             ? rawImport.split("/").slice(0, 2).join("/")
//             : rawImport.split("/")[0];

//         // Skip react (included in template), react-dom, and local modules
//         if (pkg !== "react" && pkg !== "react-dom" && !isLocalFileOrFolder(pkg)) {
//             deps[pkg] = "latest";
//         }
//     }
//     return deps;
// }



// export function detectDependencies(files) {
//     const deps = {};
//     if (!files) return deps;

//     const filePaths = Object.keys(files);

//     const isLocalFileOrFolder = (pkgName) => {
//         const name = pkgName.startsWith("@/")
//             ? pkgName.substring(2)
//             : pkgName;

//         return (
//             pkgName.startsWith("@/") ||
//             pkgName.startsWith("./") ||
//             pkgName.startsWith("../") ||
//             pkgName.startsWith("/") ||
//             pkgName === "@" ||
//             filePaths.some(p =>
//                 p === `/${name}` ||
//                 p.startsWith(`/${name}/`) ||
//                 p.replace(/\.[^/.]+$/, "") === `/${name}`
//             )
//         );
//     };

//     const importRegex =
//         /(?:import\s+(?:[^'"]*?\s+from\s+)?|export\s+[^'"]*?\s+from\s+)['"]([^'"]+)['"]/g;

//     for (const code of Object.values(files)) {
//         let match;

//         while ((match = importRegex.exec(code)) !== null) {
//             const rawImport = match[1];

//             // Ignore local file imports and aliases.
//             if (
//                 rawImport.startsWith("./") ||
//                 rawImport.startsWith("../") ||
//                 rawImport.startsWith("/") ||
//                 rawImport.startsWith("@/")
//             ) {
//                 continue;
//             }

//             // Extract the npm package name.
//             const pkg = rawImport.startsWith("@")
//                 ? rawImport.split("/").slice(0, 2).join("/")
//                 : rawImport.split("/")[0];

//             // React is already included in the Sandpack template.
//             if (
//                 pkg !== "react" &&
//                 pkg !== "react-dom" &&
//                 !isLocalFileOrFolder(pkg)
//             ) {
//                 deps[pkg] = "latest";
//             }
//         }
//     }

//     return deps;
// }



export function detectDependencies(files) {
    const deps = {};
    if (!files) return deps;

    // Normalize all project file paths to always start with a leading slash "/"
    const filePaths = Object.keys(files).map(p => p.startsWith("/") ? p : `/${p}`);

    const isLocalFileOrFolder = (pkgName) => {
        // Explicit relative or root path aliases are always local
        if (
            pkgName.startsWith("@/") ||
            pkgName.startsWith("./") ||
            pkgName.startsWith("../") ||
            pkgName.startsWith("/") ||
            pkgName === "@"
        ) {
            return true;
        }

        const cleanName = pkgName.startsWith("@/") ? pkgName.substring(2) : pkgName;
        const normalizedPath = `/${cleanName}`;

        // Match exact local file or directory paths without false positives for npm packages
        return filePaths.some(p => 
            p === normalizedPath ||
            p.startsWith(`${normalizedPath}/`) ||
            p.replace(/\.[^/.]+$/, "") === normalizedPath
        );
    };

    // Regex handles static imports, dynamic imports, and re-exports
    const importRegex =
        /(?:import\s+(?:[^'"]*?\s+from\s+)?|export\s+[^'"]*?\s+from\s+|import\s*\(\s*)['"]([^'"]+)['"]/g;

    for (const code of Object.values(files)) {
        if (typeof code !== "string") continue;

        // Reset global regex state per file to prevent skipped matches
        importRegex.lastIndex = 0;
        let match;

        while ((match = importRegex.exec(code)) !== null) {
            const rawImport = match[1].trim();

            // Skip explicit local path imports
            if (
                rawImport.startsWith("./") ||
                rawImport.startsWith("../") ||
                rawImport.startsWith("/") ||
                rawImport.startsWith("@/")
            ) {
                continue;
            }

            // Extract the top-level npm package name (handles scoped packages like @radix-ui/react-slot)
            const pkg = rawImport.startsWith("@")
                ? rawImport.split("/").slice(0, 2).join("/")
                : rawImport.split("/")[0];

            // Add valid external npm packages to dependencies
            if (
                pkg &&
                pkg !== "react" &&
                pkg !== "react-dom" &&
                !isLocalFileOrFolder(pkg)
            ) {
                deps[pkg] = "latest";
            }
        }
    }

    console.log("deps: kdjfkjfkj: " ,deps)
    return deps;
}