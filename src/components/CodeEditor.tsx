import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

const CodeEditor = () => {
  const DEFAULT_CONTENT = `// Hello !`;
  const fileUri = "default.tsx";
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      jsxFactory: "React.createElement",
      reactNamespace: "React",
      allowNonTsExtensions: true,
      allowJs: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
    });
  }, [monaco]);
  return (
    <div>
      <Editor
        defaultPath={fileUri}
        defaultLanguage="typescript"
        defaultValue={DEFAULT_CONTENT}
        className="h-100"
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;
