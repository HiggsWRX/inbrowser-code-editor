import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import useApplicationStore from "../state/application.state";

type TextEditorProps = {
	index: number;
	content: string;
};

const TextEditor = ({ index, content }: TextEditorProps) => {
	const updateSectionContent = useApplicationStore(
		(state) => state.updateSectionContent,
	);
	const ref = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string | undefined>(content);
	const [editing, setEditing] = useState(false);

	const handleChange = (newValue: string | undefined) => {
		if (newValue === undefined) {
			return;
		}

		setValue(newValue);
	};

	const handleViewerClick = () => {
		setEditing(true);
	};

	useEffect(() => {
		const listen = (ev: MouseEvent) => {
			if (
				ref.current &&
				ev.target &&
				!ref.current.contains(ev.target as Node)
			) {
				setEditing(false);
			}
		};

		document.addEventListener("click", listen, { capture: true });
		return () => {
			document.removeEventListener("click", listen, { capture: true });
		};
	}, []);

	useEffect(() => {
		if (!editing) updateSectionContent(index, value ?? "");
	}, [editing, updateSectionContent, index, value]);

	return editing ? (
		<div ref={ref}>
			<MDEditor value={value} onChange={handleChange} className="min-h-100" />
		</div>
	) : (
		<div
			className="rounded w-3/4 p-4 mx-a bg-gradient-to-r from-red to-sky"
			onClick={handleViewerClick}
			onKeyDown={handleViewerClick}
			tabIndex={-1}
		>
			<MDEditor.Markdown
				source={value}
				className={"rounded px-8 py-4 bg-gray-9"}
			/>
		</div>
	);
};

export default TextEditor;
