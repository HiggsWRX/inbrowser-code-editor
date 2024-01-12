import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import useApplicationStore from "../state/application.state";

type TCodeEditorProps = {
	content: string;
};

const CodeEditor = ({ content }: TCodeEditorProps) => {
	const fileUri = "default.tsx";
	const monaco = useMonaco();
	const reactDefinitions = useApplicationStore(
		(state) => state.reactDefinitions,
	);

	useEffect(() => {
		if (!monaco) return;

		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.Latest,
			allowNonTsExtensions: true,
			moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			module: monaco.languages.typescript.ModuleKind.CommonJS,
			noEmit: true,
			esModuleInterop: true,
			jsx: monaco.languages.typescript.JsxEmit.React,
			reactNamespace: "React",
			allowJs: true,
			typeRoots: ["node_modules/@types"],
		});

		monaco.languages.typescript.typescriptDefaults.addExtraLib(
			reactDefinitions,
			"file:///node_modules/@react/types/index.d.ts",
		);

		monaco.editor.defineTheme("default", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": "#0d1117",
			},
		});
		monaco.editor.setTheme("default");
	}, [monaco, reactDefinitions]);

	return (
		<div className="rounded border-1 border-dark-1 border-solid p-[1px]">
			<Editor
				path={fileUri}
				defaultLanguage="typescript"
				defaultValue={content}
				className="h-100"
			/>
		</div>
	);
};

export default CodeEditor;
