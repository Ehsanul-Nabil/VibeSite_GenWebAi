// Fix double-escaped newlines/quotes from AI JSON string output
export function normalizeContent(content) {
    if (!content) return "";


//     const str = "A";
// console.log(str.charAt(0));     // "A" (the character)
// console.log(str.charCodeAt(0)); // 65  (the character code)

    // Remove BOM if present
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1);
    }

//     Structure: / ... /   g->global(all)
// The slashes indicate that everything inside them is a regular expression pattern.

    // Normalize \r\n to \n
    content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");


    // content.match(/\n/g) searches the string for every actual newline character and returns them as an array. Adding .length counts how many elements are in that array—telling you how many newlines are in the file.
    const realNewlines = (content.match(/\n/g) || []).length;


// const string1 = "Hello\nWorld";   // Has a real newline (Enter key)
// const string2 = "Hello\\nWorld";  // Has literal text "\n"
// In programming, "literal" means exact raw text as it is written—not a special character or command.

    const literalBackslashN = (content.match(/\\n/g) || []).length;

    if (literalBackslashN > realNewlines) {
        // Triple-escaped first: \\\\n → \\n (leave as literal), then \\n → \n
        content = content
            .replace(/\\\\n/g, "%%PRESERVED_ESCAPED_N%%")
            .replace(/\\n/g, "\n")
            .replace(/%%PRESERVED_ESCAPED_N%%/g, "\\n")
            .replace(/\\t/g, "\t")
            .replace(/\\r/g, "")
            .replace(/\\\\/g, "\\");
    }

    // Always clean up backslash-escaped quotes (e.g. className=\"relative\") in code.
    // This is safe because "contains escaped quotes" is always invalid syntax in JSX/React.
    content = content.replace(/(\w+)=\\"([^"]*?)\\"/g, '$1="$2"');

    return content;
}
